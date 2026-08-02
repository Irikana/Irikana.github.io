# -*- coding: utf-8 -*-
"""生成论文配图（匹配 symmetry-operations-presentation.html 的扁平化风格）"""
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, Arc, Circle, Ellipse, Rectangle, FancyBboxPatch
import os

# 中文字体
plt.rcParams['font.sans-serif'] = ['Microsoft YaHei', 'SimHei', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False
plt.rcParams['font.size'] = 11

OUT_DIR = r'g:\PClite\shepherdsLibrary\Irikana.github.io\docs\paper-figures'
os.makedirs(OUT_DIR, exist_ok=True)

# 配色（与 presentation 一致）
C_ACCENT = '#2c3e50'      # 主强调色
C_BLUE = '#2980b9'        # 速度 / 小球
C_RED = '#c0392b'         # 重力
C_GREEN = '#27ae60'       # 凹轨道 / 正确结果
C_BG = '#f5f5f5'          # 背景框
C_TEXT = '#1a1a1a'
C_LIGHT = '#888888'
C_BORDER = '#e0e0e0'

# ============================================================
# 图1：匀速游动的鱼 —— 原问题
# ============================================================
fig, ax = plt.subplots(figsize=(8, 3.4), dpi=150)

# 水体背景（扁平浅灰）
ax.add_patch(Rectangle((0.5, 0.5), 9, 2.4, facecolor=C_BG, edgecolor=C_BORDER, linewidth=1))

fish_x, fish_y = 6, 1.75
# 鱼身：椭圆，扁平风格
ax.add_patch(Ellipse((fish_x, fish_y), 1.6, 0.7, facecolor=C_ACCENT, edgecolor=C_ACCENT, linewidth=0, alpha=0.12))
ax.add_patch(Ellipse((fish_x, fish_y), 1.6, 0.7, facecolor='none', edgecolor=C_ACCENT, linewidth=2))
# 鱼尾（三角形）
ax.plot([fish_x + 0.8, fish_x + 1.3, fish_x + 1.3, fish_x + 0.8],
        [fish_y, fish_y - 0.22, fish_y + 0.22, fish_y], color=C_ACCENT, linewidth=2)
# 鱼眼
ax.add_patch(Circle((fish_x - 0.55, fish_y + 0.1), 0.06, facecolor=C_ACCENT, zorder=5))

# 速度箭头 v（向左，蓝色）
ax.annotate('', xy=(1.6, 1.75), xytext=(4.4, 1.75),
            arrowprops=dict(arrowstyle='->', color=C_BLUE, lw=2.2))
ax.text(3.0, 2.05, r'$\vec{v}$ (恒定)', fontsize=13, color=C_BLUE, fontweight='bold')

# 重力箭头（红色）
ax.annotate('', xy=(fish_x, fish_y - 0.55), xytext=(fish_x, fish_y - 0.05),
            arrowprops=dict(arrowstyle='->', color=C_RED, lw=2))
ax.text(fish_x + 0.15, fish_y - 0.45, r'$m\vec{g}$', fontsize=12, color=C_RED, fontweight='bold')

# 水的作用力（未知，绿色虚线）
ax.annotate('', xy=(fish_x, fish_y + 0.85), xytext=(fish_x, fish_y + 0.35),
            arrowprops=dict(arrowstyle='->', color=C_GREEN, lw=2, linestyle='--'))
ax.text(fish_x + 0.12, fish_y + 0.55, r'$\vec{F}$', fontsize=12, color=C_GREEN, fontweight='bold')
ax.text(fish_x + 0.40, fish_y + 0.55, '水=?', fontsize=12, color=C_GREEN, fontweight='bold')

ax.text(5, 0.25, '图1  匀速向左游动的鱼', fontsize=12, ha='center', color=C_TEXT)

ax.set_xlim(0, 10)
ax.set_ylim(0, 3.4)
ax.set_aspect('equal')
ax.axis('off')
plt.tight_layout()
plt.savefig(os.path.join(OUT_DIR, 'fig1_fish_moving.png'), dpi=180, bbox_inches='tight', facecolor='white')
plt.close()
print('图1 已生成')

# ============================================================
# 图2：匀速游动的鱼 —— 转化后（鱼静止参考系）
# ============================================================
fig, ax = plt.subplots(figsize=(8, 3.4), dpi=150)

ax.add_patch(Rectangle((0.5, 0.5), 9, 2.4, facecolor=C_BG, edgecolor=C_BORDER, linewidth=1))

fish_x, fish_y = 5, 1.75
ax.add_patch(Ellipse((fish_x, fish_y), 1.6, 0.7, facecolor=C_ACCENT, edgecolor=C_ACCENT, linewidth=0, alpha=0.12))
ax.add_patch(Ellipse((fish_x, fish_y), 1.6, 0.7, facecolor='none', edgecolor=C_ACCENT, linewidth=2))
ax.plot([fish_x + 0.8, fish_x + 1.3, fish_x + 1.3, fish_x + 0.8],
        [fish_y, fish_y - 0.22, fish_y + 0.22, fish_y], color=C_ACCENT, linewidth=2)
ax.add_patch(Circle((fish_x - 0.55, fish_y + 0.1), 0.06, facecolor=C_ACCENT, zorder=5))

# 水流箭头（向右，蓝色）
ax.annotate('', xy=(9.0, 1.75), xytext=(6.5, 1.75),
            arrowprops=dict(arrowstyle='->', color=C_BLUE, lw=2.2))
ax.text(7.5, 2.05, r'水流 $\vec{v}$', fontsize=12, color=C_BLUE, fontweight='bold')

# 重力向下
ax.annotate('', xy=(fish_x, fish_y - 0.55), xytext=(fish_x, fish_y - 0.05),
            arrowprops=dict(arrowstyle='->', color=C_RED, lw=2))
ax.text(fish_x + 0.15, fish_y - 0.45, r'$m\vec{g}$', fontsize=12, color=C_RED, fontweight='bold')

# 水的作用力向上
ax.annotate('', xy=(fish_x, fish_y + 0.85), xytext=(fish_x, fish_y + 0.35),
            arrowprops=dict(arrowstyle='->', color=C_GREEN, lw=2.2))
ax.text(fish_x + 0.12, fish_y + 0.55, r'$\vec{F}$', fontsize=12, color=C_GREEN, fontweight='bold')
ax.text(fish_x + 0.38, fish_y + 0.55, '水', fontsize=12, color=C_GREEN, fontweight='bold')

# 平衡标注（扁平信息框）
ax.text(fish_x - 1.8, fish_y + 0.7, r'$\sum\vec{F}=0$', fontsize=13, color=C_ACCENT,
        fontweight='bold', bbox=dict(boxstyle='square,pad=0.35', facecolor='white', edgecolor=C_ACCENT, linewidth=1.5))

ax.text(5, 0.25, '图2  切换到鱼静止的参考系（伽利略变换）', fontsize=12, ha='center', color=C_TEXT)

ax.set_xlim(0, 10)
ax.set_ylim(0, 3.4)
ax.set_aspect('equal')
ax.axis('off')
plt.tight_layout()
plt.savefig(os.path.join(OUT_DIR, 'fig2_fish_rest_frame.png'), dpi=180, bbox_inches='tight', facecolor='white')
plt.close()
print('图2 已生成')

# ============================================================
# 图3：凹凸轨道 —— 原问题
# ============================================================
fig, ax = plt.subplots(figsize=(8, 5), dpi=150)

# 对称轴（水平虚线）
ax.plot([1, 9], [3, 3], color=C_LIGHT, lw=1, linestyle='--')
ax.text(9.1, 3, '对称轴', fontsize=10, color=C_LIGHT, va='center')

# 凸轨道（上方，先上后下）
t = np.linspace(0, np.pi, 100)
x_convex = 2 + 3 * t / np.pi
y_convex = 3 + 1.2 * np.sin(t)
ax.plot(x_convex, y_convex, color=C_ACCENT, lw=2.5)
ax.text(3.5, 4.4, '凸轨道（先上后下）', fontsize=11, color=C_ACCENT, fontweight='bold', ha='center')

# 凹轨道（下方，先下后上）
y_concave = 3 - 1.2 * np.sin(t)
ax.plot(x_convex, y_concave, color=C_GREEN, lw=2.5)
ax.text(3.5, 1.5, '凹轨道（先下后上）', fontsize=11, color=C_GREEN, fontweight='bold', ha='center')

# 两小球（起点）
ax.add_patch(Circle((2, 3 + 0.001), 0.12, color=C_BLUE, zorder=5))
ax.add_patch(Circle((2, 3 - 0.001), 0.12, color=C_BLUE, zorder=5))

# 初速度箭头
ax.annotate('', xy=(2.5, 3.25), xytext=(2, 3),
            arrowprops=dict(arrowstyle='->', color=C_BLUE, lw=1.8))
ax.text(2.1, 3.35, r'$\vec{v}_0$', fontsize=11, color=C_BLUE, fontweight='bold')

ax.annotate('', xy=(2.5, 2.75), xytext=(2, 3),
            arrowprops=dict(arrowstyle='->', color=C_BLUE, lw=1.8))
ax.text(2.1, 2.5, r'$\vec{v}_0$', fontsize=11, color=C_BLUE, fontweight='bold')

# 重力箭头
ax.annotate('', xy=(5, 1.8), xytext=(5, 4.2),
            arrowprops=dict(arrowstyle='->', color=C_RED, lw=2.2))
ax.text(5.15, 3.0, r'$\vec{g}$', fontsize=14, color=C_RED, fontweight='bold')

# 终点标记
ax.plot(5, 3, 'k|', ms=15, mew=2)
ax.text(5.15, 3.15, '终点', fontsize=10, color=C_TEXT)

ax.text(5, 0.5, '图3  凹凸轨道问题：两相同小球以相同初速度释放，谁先到达终点？',
        fontsize=11, ha='center', color=C_TEXT)

ax.set_xlim(1, 10)
ax.set_ylim(0, 5.2)
ax.set_aspect('equal')
ax.axis('off')
plt.tight_layout()
plt.savefig(os.path.join(OUT_DIR, 'fig3_tracks_problem.png'), dpi=180, bbox_inches='tight', facecolor='white')
plt.close()
print('图3 已生成')

# ============================================================
# 图4：旋转90° + 添加镜像轨道 → 完全对称
# ============================================================
fig, ax = plt.subplots(figsize=(5.5, 6.5), dpi=150)

# 对称轴（竖直虚线）
ax.plot([5, 5], [0.5, 9], color=C_LIGHT, lw=1, linestyle='--')
ax.text(5.1, 9, '对称轴', fontsize=10, color=C_LIGHT)

# 右侧轨道（原凸，旋转后）
t = np.linspace(0, np.pi, 100)
x_r = 5 + 1.2 * np.sin(t)
y_r = 1.5 + 6 * t / np.pi
ax.plot(x_r, y_r, color=C_ACCENT, lw=2.5)

# 左侧轨道（原凹，旋转后）
x_l = 5 - 1.2 * np.sin(t)
ax.plot(x_l, y_r, color=C_GREEN, lw=2.5)

# 添加镜像（虚线）形成双壁通道
ax.plot(5 + 1.2 * np.sin(t) + 0.6, y_r, color=C_ACCENT, lw=1.5, ls='--', alpha=0.6)
ax.plot(5 - 1.2 * np.sin(t) - 0.6, y_r, color=C_GREEN, lw=1.5, ls='--', alpha=0.6)

# 两小球
ax.add_patch(Circle((5 - 1.2, 1.5), 0.12, color=C_BLUE, zorder=5))
ax.add_patch(Circle((5 + 1.2, 1.5), 0.12, color=C_BLUE, zorder=5))

# 重力（沿对称轴向下）
ax.annotate('', xy=(5, 1.0), xytext=(5, 2.5),
            arrowprops=dict(arrowstyle='->', color=C_RED, lw=2.2))
ax.text(5.15, 1.7, r'$\vec{g}$', fontsize=14, color=C_RED, fontweight='bold')

# 同时到达标注
ax.text(5, 8.3, '完全对称构型', fontsize=12, ha='center', color=C_TEXT,
        fontweight='bold', bbox=dict(boxstyle='square,pad=0.35', facecolor='white', edgecolor=C_ACCENT, linewidth=1.5))
ax.text(5, 7.7, '两球同时到达', fontsize=11, ha='center', color=C_GREEN, fontweight='bold')

ax.text(5, 0.2, '图4  旋转90°并添加镜像轨道后，系统关于竖直轴完全对称',
        fontsize=10, ha='center', color=C_TEXT)

ax.set_xlim(2, 8)
ax.set_ylim(0, 9.2)
ax.set_aspect('equal')
ax.axis('off')
plt.tight_layout()
plt.savefig(os.path.join(OUT_DIR, 'fig4_symmetric_config.png'), dpi=180, bbox_inches='tight', facecolor='white')
plt.close()
print('图4 已生成')

# ============================================================
# 图5：对称性破缺 —— 旋转回原位
# ============================================================
fig, ax = plt.subplots(figsize=(8, 5), dpi=150)

# 对称轴（水平虚线）
ax.plot([1, 9], [3, 3], color=C_LIGHT, lw=1, linestyle='--')

# 凸轨道
x_convex = 2 + 3 * t / np.pi
y_convex = 3 + 1.2 * np.sin(t)
ax.plot(x_convex, y_convex, color=C_ACCENT, lw=2.5)

# 凹轨道
y_concave = 3 - 1.2 * np.sin(t)
ax.plot(x_convex, y_concave, color=C_GREEN, lw=2.5)

# 小球
ax.add_patch(Circle((2, 3 + 0.001), 0.12, color=C_BLUE, zorder=5))
ax.add_patch(Circle((2, 3 - 0.001), 0.12, color=C_BLUE, zorder=5))

# 重力（偏离对称轴）
ax.annotate('', xy=(5, 1.8), xytext=(5, 4.2),
            arrowprops=dict(arrowstyle='->', color=C_RED, lw=2.2))
ax.text(5.15, 3.0, r'$\vec{g}$', fontsize=14, color=C_RED, fontweight='bold')

# 破缺方向标注
ax.annotate('对称性破缺\n重力偏离对称轴', xy=(5, 4.2), xytext=(7, 4.5),
            fontsize=10, color=C_RED, ha='center',
            arrowprops=dict(arrowstyle='->', color=C_RED, lw=1.2))

# 凹轨道受正功标注
ax.annotate('', xy=(3.5, 1.8), xytext=(3.5, 2.5),
            arrowprops=dict(arrowstyle='->', color=C_GREEN, lw=2))
ax.text(3.7, 2.0, '正功更大', fontsize=10, color=C_GREEN, fontweight='bold')

ax.text(3.5, 0.8, '凹轨道\n先到', fontsize=11, color=C_GREEN, fontweight='bold', ha='center',
        bbox=dict(boxstyle='square,pad=0.35', facecolor='white', edgecolor=C_GREEN, linewidth=1.5))

ax.text(5, 0.2, '图5  旋转回原位 = 对称性破缺，力场偏向凹轨道，凹轨道小球先到达',
        fontsize=10, ha='center', color=C_TEXT)

ax.set_xlim(1, 10)
ax.set_ylim(0, 5.2)
ax.set_aspect('equal')
ax.axis('off')
plt.tight_layout()
plt.savefig(os.path.join(OUT_DIR, 'fig5_symmetry_breaking.png'), dpi=180, bbox_inches='tight', facecolor='white')
plt.close()
print('图5 已生成')

# ============================================================
# 图6：方法流程图（黑白配色）
# ============================================================
fig, ax = plt.subplots(figsize=(8.5, 4.5), dpi=150)

boxes = [
    (1, 3, '原问题'),
    (4, 3, '识别/构造\n对称性'),
    (7, 3, '对称操作\n（有限步）'),
    (10, 3, '等价新问题\n（更简单）'),
    (10, 1, '相同结果\n不同呈现'),
    (4, 1, '分析对称性\n破缺（可选）'),
    (1, 1, '定性推断\n偏离方向'),
]

for x, y, text in boxes:
    ax.add_patch(Rectangle((x - 0.9, y - 0.4), 1.8, 0.8, facecolor='white', edgecolor='black', lw=1.5))
    ax.text(x, y, text, fontsize=10, ha='center', va='center', color='black', fontweight='bold')

# 主流程箭头
ax.annotate('', xy=(3.1, 3), xytext=(1.9, 3), arrowprops=dict(arrowstyle='->', lw=1.5, color='black'))
ax.annotate('', xy=(6.1, 3), xytext=(4.9, 3), arrowprops=dict(arrowstyle='->', lw=1.5, color='black'))
ax.annotate('', xy=(9.1, 3), xytext=(7.9, 3), arrowprops=dict(arrowstyle='->', lw=1.5, color='black'))
ax.annotate('', xy=(10, 1.4), xytext=(10, 2.6), arrowprops=dict(arrowstyle='->', lw=1.5, color='black'))

# 破缺分支
ax.annotate('', xy=(4, 1.4), xytext=(9.1, 1), arrowprops=dict(arrowstyle='->', lw=1.2, color='black', ls='--'))
ax.annotate('', xy=(1.9, 1), xytext=(3.1, 1), arrowprops=dict(arrowstyle='->', lw=1.2, color='black', ls='--'))

ax.text(6.5, 0.5, '虚线：当对称性被破缺时的定性分析路径', fontsize=9, color='#555', ha='center', style='italic')

ax.text(5.5, 4.3, '图6  对称操作问题转化方法流程', fontsize=12, ha='center', color='black', fontweight='bold')

ax.set_xlim(0, 11)
ax.set_ylim(0, 4.8)
ax.set_aspect('equal')
ax.axis('off')
plt.tight_layout()
plt.savefig(os.path.join(OUT_DIR, 'fig6_method_flowchart.png'), dpi=180, bbox_inches='tight', facecolor='white')
plt.close()
print('图6 已生成')

print('\n所有图片生成完毕，路径：', OUT_DIR)
