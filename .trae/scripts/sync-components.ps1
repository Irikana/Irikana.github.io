<#
.SYNOPSIS
    Shepherd's Library - Safe CSS Class Sync Tool (PS5 compatible)

.DESCRIPTION
    Safely replace CSS class names across project files.
    Only replaces inside class="", style="", <style> blocks - NEVER touches text content.

.PARAMETER OldName  Old class name(s), comma-separated array
.PARAMETER NewName  New class name(s), comma-separated array
.PARAMETER DryRun   Preview only, no writes
#>

param(
    [Parameter(Mandatory=$true)][string[]]$OldName,
    [Parameter(Mandatory=$true)][string[]]$NewName,
    [switch]$DryRun,
    [string[]]$ExcludeDirs = @("notionExport",".trae","template","docs",".arts")
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path (Split-Path (Split-Path $MyInvocation.MyCommand.Path))

if ($OldName.Count -ne $NewName.Count) {
    Write-Host "ERROR: OldName/NewName count mismatch" -ForegroundColor Red; exit 1
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Shepherd's Library - Component Sync Tool" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Root: $ProjectRoot"
Write-Host "  Mode: $(if($DryRun){'DRY RUN'}else{'LIVE'})" -ForegroundColor $(if($DryRun){'Yellow'}else{'Green'})
Write-Host ""

$exts = @("*.html","*.css","*.js")
$grandTotal = 0

for ($p = 0; $p -lt $OldName.Count; $p++) {
    $old = $OldName[$p]; $new = $NewName[$p]
    Write-Host "--- [$($p+1)/$($OldName.Count)] '$old' -> '$new' ---" -ForegroundColor Yellow

    $files = @()
    foreach ($e in $exts) {
        $found = Get-ChildItem -Path $ProjectRoot -Filter $e -Recurse -File |
            Where-Object {
                $skip = $false
                foreach ($d in $ExcludeDirs) { if ($_.FullName -like "*\$d\*") { $skip = $true; break } }
                -not $skip
            }
        $files += @($found)
    }

    $fCount = 0; $hCount = 0

    foreach ($file in $files) {
        $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
        if ($content.IndexOf($old) -eq -1) { continue }

        $lines = $content -split "`n"
        $result = New-Object System.Collections.ArrayList
        $inStyle = $false
        $fHits = 0

        foreach ($rawLine in $lines) {
            $line = $rawLine

            if ($line.Contains("<style")) { $inStyle = $true }
            if ($line.Contains("</style>")) { $inStyle = $false }

            if ($inStyle) {
                # Inside style block: allow free replacement
                $newLine = $line.Replace($old, $new)
                if ($newLine -ne $line) { $fHits++; if($DryRun){Write-Host "  [S] $($file.Name):$(Array.IndexOf($lines,$rawLine)+1)" -ForegroundColor DarkGray} }
                [void]$result.Add($newLine)
            } else {
                # Outside style block: only replace in class="..." and style="..." attributes
                $modified = $line

                # Replace inside class="..." attributes
                $idx = 0
                while (($ci = $modified.IndexOf('class=', $idx)) -ge 0) {
                    $qStart = $modified.IndexOf('"', $ci + 6)
                    if ($qStart -eq -1) { $qStart = $modified.IndexOf("'", $ci + 6) }
                    if ($qStart -eq -1) { $idx = $ci + 6; continue }
                    $quoteChar = $modified.Substring($qStart, 1)
                    $qEnd = $modified.IndexOf($quoteChar, $qStart + 1)
                    if ($qEnd -eq -1) { break }
                    $attrVal = $modified.Substring($qStart + 1, $qEnd - $qStart - 1)
                    if ($attrVal.Contains($old)) {
                        $newVal = $attrVal.Replace($old, $new)
                        $before = $modified.Substring(0, $qStart + 1)
                        $after = $modified.Substring($qEnd)
                        $modified = "$before$newVal`$after"
                        $fHits++
                    }
                    $idx = $qEnd + 1
                }

                # Replace inside style="..." attributes
                $idx = 0
                while (($si = $modified.IndexOf('style=', $idx)) -ge 0) {
                    $qStart = $modified.IndexOf('"', $si + 6)
                    if ($qStart -eq -1) { $qStart = $modified.IndexOf("'", $si + 6) }
                    if ($qStart -eq -1) { $idx = $si + 6; continue }
                    $quoteChar = $modified.Substring($qStart, 1)
                    $qEnd = $modified.IndexOf($quoteChar, $qStart + 1)
                    if ($qEnd -eq -1) { break }
                    $attrVal = $modified.Substring($qStart + 1, $qEnd - $qStart - 1)
                    if ($attrVal.Contains($old)) {
                        $newVal2 = $attrVal.Replace($old, $new)
                        $before = $modified.Substring(0, $qStart + 1)
                        $after = $modified.Substring($qEnd)
                        $modified = "$before$newVal2`$after"
                        $fHits++
                    }
                    $idx = $qEnd + 1
                }

                [void]$result.Add($modified)
            }
        }

        if ($fHits -gt 0) {
            $fCount++; $hCount += $fHits; $grandTotal += $fHits
            $rel = $file.FullName.Replace("$ProjectRoot\", "")
            if (-not $DryRun) {
                [System.IO.File]::WriteAllText($file.FullName, ($result -join "`n"), [System.Text.Encoding]::UTF8)
                Write-Host "  [+] $rel ($fHits)" -ForegroundColor Green
            } else {
                Write-Host "  [~] $rel ($fHits)" -ForegroundColor Yellow
            }
        }
    }

    Write-Host "  => Files:$fCount Hits:$hCount" -ForegroundColor $(if($hCount-gt0){'Cyan'}else{'DarkGray'})
    Write-Host ""
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host " Total: $grandTotal hits across project" -ForegroundColor $(if($grandTotal-gt0){'Green'}else{'DarkGray'})
if ($DryRun) { Write-Host " DRY RUN mode - remove -DryRun to apply" -ForegroundColor Yellow }
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
