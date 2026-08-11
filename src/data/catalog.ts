import type { ImageMetadata } from 'astro';
import cloudlightAutomatorIcon from '../assets/projects/cloudlight-automator/icon.png';
import cloudlightAutomatorScreenshot from '../assets/projects/cloudlight-automator/screenshot.png';
import cloudlightCodexBridgeIcon from '../assets/projects/codex-bridge/icon.png';
import cloudlightCodexBridgeScreenshot from '../assets/projects/codex-bridge/screenshot.png';
import cloudlightCodexBridgeScreenshot2 from '../assets/projects/codex-bridge/screenshot-2.png';
import cloudlightCodexBridgeScreenshot3 from '../assets/projects/codex-bridge/screenshot-3.png';
import cloudlightOverwatchYoutubeWatcherIcon from '../assets/projects/cloudlight-overwatch-youtube-watcher/icon.png';
import cloudlightOverwatchYoutubeWatcherScreenshot from '../assets/projects/cloudlight-overwatch-youtube-watcher/screenshot.png';
import cloudlightSoopDropsMinerIcon from '../assets/projects/cloudlight-soop-drops-miner/icon.png';
import cloudlightSoopDropsMinerScreenshot from '../assets/projects/cloudlight-soop-drops-miner/screenshot.png';
import heyboxPostExporterScreenshot from '../assets/projects/heybox-post-exporter/screenshot.png';
import microsoftPinyinCleanerIcon from '../assets/projects/microsoft-pinyin-cleaner/icon.png';
import microsoftPinyinCleanerScreenshot from '../assets/projects/microsoft-pinyin-cleaner/screenshot.png';
import mobileHotspotControllerIcon from '../assets/projects/mobile-hotspot-controller/icon.png';
import mobileHotspotControllerScreenshot from '../assets/projects/mobile-hotspot-controller/screenshot.png';
import powerSettingsManagerIcon from '../assets/projects/power-settings-manager/icon.png';
import powerSettingsManagerScreenshot from '../assets/projects/power-settings-manager/screenshot.png';
import tdmClaimTogglePatcherIcon from '../assets/projects/tdm-claim-toggle-patcher/icon.png';
import tdmClaimTogglePatcherScreenshot from '../assets/projects/tdm-claim-toggle-patcher/screenshot.png';
import twitterXMediaRenamerScreenshot from '../assets/projects/twitter-x-media-renamer/screenshot.png';

export type CatalogKind = 'desktop' | 'online' | 'userscript';
export type CatalogCategoryId = 'windows' | 'games' | 'scripts';
export type CatalogAccent = 'blue' | 'cyan' | 'violet' | 'amber';

export interface CatalogCategory {
	id: CatalogCategoryId;
	name: string;
	description: string;
}

export interface CatalogAction {
	label: string;
	href: string;
	external?: boolean;
}

export interface CatalogScreenshot {
	image: ImageMetadata;
	alt: string;
	caption?: string;
}

export interface CatalogItem {
	id: string;
	name: string;
	englishName?: string;
	summary: string;
	kind: CatalogKind;
	category: CatalogCategoryId;
	status: 'available';
	capabilities: string[];
	accent: CatalogAccent;
	featured?: boolean;
	icon?: ImageMetadata;
	screenshot?: ImageMetadata;
	screenshotAlt?: string;
	screenshotCaption?: string;
	screenshots?: CatalogScreenshot[];
	detailsPath?: string;
	primaryAction: CatalogAction;
	secondaryAction?: CatalogAction;
	ctaNote?: string;
}

export const catalogCategories: CatalogCategory[] = [
	{
		id: 'windows',
		name: 'Windows 工具',
		description: '安装在电脑上的系统、整理、导出与自动化工具。',
	},
	{
		id: 'games',
		name: '游戏与直播',
		description: '游戏数据、趣味互动和直播活动辅助工具。',
	},
	{
		id: 'scripts',
		name: '浏览器脚本',
		description: '在特定网页中减少重复操作的小型脚本。',
	},
];

export const kindLabels: Record<CatalogKind, string> = {
	desktop: '桌面软件',
	online: '在线工具',
	userscript: '用户脚本',
};

export const statusLabels: Record<CatalogItem['status'], string> = {
	available: '可用',
};

export const projects: CatalogItem[] = [
	{
		id: 'cloudlight-automator',
		name: 'CloudLight 自动化工作室',
		englishName: 'CloudLight Automator',
		summary: '用可视化流程组合窗口、截图、图像识别、文字识别和键鼠操作。',
		kind: 'desktop',
		category: 'windows',
		status: 'available',
		capabilities: ['可视化流程', '图像与文字识别', '键鼠操作'],
		accent: 'violet',
		featured: true,
		icon: cloudlightAutomatorIcon,
		screenshot: cloudlightAutomatorScreenshot,
		screenshotAlt: 'CloudLight 自动化工作室的可视化工作流编辑界面',
		screenshotCaption: '在节点画布中连接自动化步骤，并在右侧设置窗口、识别和输入参数。',
		detailsPath: '/projects/cloudlight-automator/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/yundan125/cloudlight-automator/releases/latest',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/yundan125/cloudlight-automator',
			external: true,
		},
	},
	{
		id: 'cloudlight-codex-bridge',
		name: 'CloudLight Codex Bridge',
		summary: '把电脑上的 Codex 会话连接到 QQ 或 Telegram，远程发送任务并接收最终回复。',
		kind: 'desktop',
		category: 'windows',
		status: 'available',
		capabilities: ['QQ 与 Telegram', '远程继续会话', '桌面配置'],
		accent: 'cyan',
		featured: true,
		icon: cloudlightCodexBridgeIcon,
		screenshots: [
			{
				image: cloudlightCodexBridgeScreenshot,
				alt: 'CloudLight Codex Bridge 的远程渠道页面，显示 Telegram 与 QQ 机器人连接和会话状态',
				caption: '在远程渠道页面配置、测试并管理 Telegram 与 QQ 官方机器人连接。',
			},
			{
				image: cloudlightCodexBridgeScreenshot2,
				alt: 'CloudLight Codex Bridge 的概览页面，显示 Codex、QQ、Telegram 和消息同步状态',
				caption: '概览页集中显示 Codex 会话、远程渠道、消息同步和最近活动状态。',
			},
			{
				image: cloudlightCodexBridgeScreenshot3,
				alt: '通过 QQ 与 CloudLight Codex Bridge 远程连接的 Codex 会话对话界面',
				caption: '在 QQ 中用稳定的会话编号发送任务，并接收 Codex 的最终回复。',
			},
		],
		detailsPath: '/projects/cloudlight-codex-bridge/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/yundan125/Codex-Bridge/releases/download/v0.7.1/CloudLight-CodexBridge-Setup-0.7.1-win-x64.exe',
			external: true,
		},
		secondaryAction: {
			label: '下载便携版',
			href: 'https://github.com/yundan125/Codex-Bridge/releases/download/v0.7.1/CloudLight-CodexBridge-Portable-0.7.1-win-x64.zip',
			external: true,
		},
		ctaNote: 'v0.7.1 · 推荐安装版，已包含 .NET 8 Windows 桌面运行环境。',
	},
	{
		id: 'twitter-x-media-renamer',
		name: 'Twitter/X 媒体文件批量改名工具',
		englishName: 'TwitterXMediaRenamer',
		summary: '根据帖子正文批量重命名下载的 Twitter/X 图片和视频，执行前可先预览结果。',
		kind: 'desktop',
		category: 'windows',
		status: 'available',
		capabilities: ['自动识别帖子', '改名前预览', '避免重名覆盖'],
		accent: 'blue',
		featured: true,
		screenshot: twitterXMediaRenamerScreenshot,
		screenshotAlt: 'Twitter/X 媒体文件批量改名工具的文件扫描与重命名预览界面',
		screenshotCaption: '选择媒体文件夹后，扫描帖子 ID、获取正文并在表格中预览新的文件名。',
		detailsPath: '/projects/twitter-x-media-renamer/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/yundan125/TwitterXMediaRenamer/releases/download/v1.0.0/TwitterXMediaRenamer.exe',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/yundan125/TwitterXMediaRenamer',
			external: true,
		},
		ctaNote: '直接下载当前 Release 中的 Windows 单文件程序，无需安装 Python。',
	},
	{
		id: 'heybox-post-exporter',
		name: '小黑盒帖子完整导出工具',
		englishName: 'HeyboxPostExporter',
		summary: '把小黑盒原帖、评论、楼中楼和图片完整保存为 HTML、Markdown 与 JSON。',
		kind: 'desktop',
		category: 'windows',
		status: 'available',
		capabilities: ['评论与楼中楼', '三种导出格式', '图片本地保存'],
		accent: 'amber',
		featured: true,
		screenshot: heyboxPostExporterScreenshot,
		screenshotAlt: '小黑盒帖子完整导出工具的 Edge 连接状态、导出选项与运行日志界面',
		screenshotCaption: '确认 Edge 已连接后，选择图片和导出格式，再开始保存帖子内容。',
		detailsPath: '/projects/heybox-post-exporter/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/yundan125/HeyboxPostExporter/releases/download/v0.1.0/HeyboxPostExporter.exe',
			external: true,
		},
		secondaryAction: {
			label: '查看 GitHub',
			href: 'https://github.com/yundan125/HeyboxPostExporter',
			external: true,
		},
		ctaNote: 'v0.1.0 · Windows 10/11 x64 单文件版本；使用前还需要准备 Microsoft Edge 和 Node.js。',
	},
	{
		id: 'cloudlight-overwatch-youtube-watcher',
		name: '守望先锋 YouTube 直播观看助手',
		englishName: 'CloudLight Overwatch YouTube Watcher',
		summary: '定时查找指定 YouTube 频道的直播，并用本机 Chrome 或 Brave 打开和维持播放。',
		kind: 'desktop',
		category: 'games',
		status: 'available',
		capabilities: ['自动查找直播', '多个浏览器 Profile', '手动 URL 模式'],
		accent: 'violet',
		featured: true,
		icon: cloudlightOverwatchYoutubeWatcherIcon,
		screenshot: cloudlightOverwatchYoutubeWatcherScreenshot,
		screenshotAlt: 'CloudLight Overwatch YouTube Watcher 3.0.0 的观看模式、直播地址与运行日志界面',
		screenshotCaption: '在观看页选择自动检测频道或手动直播 URL，并查看当前播放状态。',
		detailsPath: '/projects/cloudlight-overwatch-youtube-watcher/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/yundan125/CloudLight-Overwatch-YouTube-Watcher/releases/download/v3.0.0/CloudLight.Overwatch.YouTube.Watcher.exe',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/yundan125/CloudLight-Overwatch-YouTube-Watcher',
			external: true,
		},
		ctaNote: '直接下载当前 Release 中的 Windows 程序；运行时需要已安装并更新的 Chrome 或 Brave。',
	},
	{
		id: 'cloudlight-soop-drops-miner',
		name: 'CloudLight SOOP 掉宝挂机工具',
		englishName: 'CloudLight SOOP Drops Miner',
		summary: '集中管理多个 SOOP Live 账号，按任务选择直播间并查看掉宝进度。',
		kind: 'desktop',
		category: 'games',
		status: 'available',
		capabilities: ['多账号管理', '智能选台', '奖励进度'],
		accent: 'amber',
		featured: true,
		icon: cloudlightSoopDropsMinerIcon,
		screenshot: cloudlightSoopDropsMinerScreenshot,
		screenshotAlt: 'CloudLight SOOP Drops Miner 的多账号任务管理界面',
		screenshotCaption: '在一个窗口中查看账号、直播间、掉宝任务进度和已获得奖励。',
		detailsPath: '/projects/cloudlight-soop-drops-miner/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/yundan125/cloudlight-soop-drops-miner/releases/latest',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/yundan125/cloudlight-soop-drops-miner',
			external: true,
		},
	},
	{
		id: 'microsoft-pinyin-cleaner',
		name: '微软拼音清理工具',
		englishName: 'MicrosoftPinyinCleaner',
		summary: '移除 Windows 更新后重新加入的微软拼音，同时保留其他中文输入法。',
		kind: 'desktop',
		category: 'windows',
		status: 'available',
		capabilities: ['一键检测', '安全移除', '登录自动检查'],
		accent: 'blue',
		featured: true,
		icon: microsoftPinyinCleanerIcon,
		screenshot: microsoftPinyinCleanerScreenshot,
		screenshotAlt: '微软拼音清理工具的检测与清理界面',
		screenshotCaption: '检测当前用户输入法列表，并选择立即清理或登录时自动检查。',
		detailsPath: '/projects/microsoft-pinyin-cleaner/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/yundan125/MicrosoftPinyinCleaner/releases/download/v1.0.0/MicrosoftPinyinCleaner.exe',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/yundan125/MicrosoftPinyinCleaner',
			external: true,
		},
	},
	{
		id: 'power-settings-manager',
		name: 'Windows 高级电源设置管理器',
		englishName: 'PowerSettingsManager',
		summary: '集中查看和管理 Windows 中隐藏的高级电源设置。',
		kind: 'desktop',
		category: 'windows',
		status: 'available',
		capabilities: ['隐藏设置扫描', '批量显示或隐藏', '修改前备份'],
		accent: 'cyan',
		featured: true,
		icon: powerSettingsManagerIcon,
		screenshot: powerSettingsManagerScreenshot,
		screenshotAlt: 'Windows 高级电源设置管理器的扫描结果列表',
		screenshotCaption: '按名称、分组和显示状态筛选高级电源设置，再进行显示、隐藏或恢复。',
		detailsPath: '/projects/power-settings-manager/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/yundan125/PowerSettingsManager/releases/latest',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/yundan125/PowerSettingsManager',
			external: true,
		},
	},
	{
		id: 'mobile-hotspot-controller',
		name: 'Windows 移动热点控制器',
		englishName: 'MobileHotspotController',
		summary: '在设备支持时创建不依赖互联网的 Windows 局域网热点。',
		kind: 'desktop',
		category: 'windows',
		status: 'available',
		capabilities: ['离线局域网', '热点控制', '设备诊断'],
		accent: 'blue',
		featured: true,
		icon: mobileHotspotControllerIcon,
		screenshot: mobileHotspotControllerScreenshot,
		screenshotAlt: 'Windows 移动热点控制器的热点设置与状态界面',
		screenshotCaption: '选择系统热点或仅局域网模式，并查看 Wi-Fi Direct 检测与连接状态。',
		detailsPath: '/projects/mobile-hotspot-controller/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/yundan125/MobileHotspotController/releases/latest',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/yundan125/MobileHotspotController',
			external: true,
		},
	},
	{
		id: 'tdm-claim-toggle-patcher',
		name: 'TwitchDropsMiner 领取开关补丁工具',
		englishName: 'TDM Claim Toggle Patcher',
		summary: '为 TwitchDropsMiner 增加可关闭的自动领取开关，并在修改前检查兼容性。',
		kind: 'desktop',
		category: 'games',
		status: 'available',
		capabilities: ['兼容性检查', '补丁预览', '备份与恢复'],
		accent: 'violet',
		icon: tdmClaimTogglePatcherIcon,
		screenshot: tdmClaimTogglePatcherScreenshot,
		screenshotAlt: 'TwitchDropsMiner 领取开关补丁工具的检查与应用界面',
		screenshotCaption: '选择源码目录，检查兼容性后预览、应用或恢复自动领取开关补丁。',
		detailsPath: '/projects/tdm-claim-toggle-patcher/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/yundan125/tdm-claim-toggle-patcher/releases/latest',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/yundan125/tdm-claim-toggle-patcher',
			external: true,
		},
	},
	{
		id: 'heybox-post-export-userscript',
		name: '小黑盒帖子完整展开与导出',
		summary: '不安装桌面程序，直接在小黑盒帖子页面展开全文、评论和楼中楼并导出 HTML。',
		kind: 'userscript',
		category: 'scripts',
		status: 'available',
		capabilities: ['完整展开内容', '原网页与阅读版', '离线保存图片'],
		accent: 'cyan',
		detailsPath: '/projects/heybox-post-export-userscript/',
		primaryAction: {
			label: '安装脚本',
			href: 'https://update.greasyfork.org/scripts/590697/%E5%B0%8F%E9%BB%91%E7%9B%92%E5%B8%96%E5%AD%90%E5%AE%8C%E6%95%B4%E5%B1%95%E5%BC%80%E4%B8%8E%E5%AF%BC%E5%87%BA.user.js',
			external: true,
		},
		secondaryAction: {
			label: '查看 Greasy Fork 页面',
			href: 'https://greasyfork.org/zh-CN/scripts/590697-%E5%B0%8F%E9%BB%91%E7%9B%92%E5%B8%96%E5%AD%90%E5%AE%8C%E6%95%B4%E5%B1%95%E5%BC%80%E4%B8%8E%E5%AF%BC%E5%87%BA',
			external: true,
		},
	},
	{
		id: 'shanda-passport-login-helper',
		name: '盛大通行证一键登录辅助脚本',
		summary: '打开登录页后自动勾选协议、切换登录方式并填写预先保存的账号。',
		kind: 'userscript',
		category: 'scripts',
		status: 'available',
		capabilities: ['自动填写账号', '本地保存', '不自动提交'],
		accent: 'amber',
		detailsPath: '/projects/shanda-passport-login-helper/',
		primaryAction: {
			label: '安装脚本',
			href: 'https://update.greasyfork.org/scripts/589035/%E7%9B%9B%E5%A4%A7%E9%80%9A%E8%A1%8C%E8%AF%81%E8%87%AA%E5%8A%A8%E5%88%87%E6%8D%A2%E4%B8%80%E9%94%AE%E7%99%BB%E5%BD%95%E5%B9%B6%E5%A1%AB%E5%86%99%E8%B4%A6%E5%8F%B7.user.js',
			external: true,
		},
		secondaryAction: {
			label: '查看 Greasy Fork 页面',
			href: 'https://greasyfork.org/zh-CN/scripts/589035-%E7%9B%9B%E5%A4%A7%E9%80%9A%E8%A1%8C%E8%AF%81%E8%87%AA%E5%8A%A8%E5%88%87%E6%8D%A2%E4%B8%80%E9%94%AE%E7%99%BB%E5%BD%95%E5%B9%B6%E5%A1%AB%E5%86%99%E8%B4%A6%E5%8F%B7',
			external: true,
		},
	},
];

export const gameTools: CatalogItem[] = [
	{
		id: 'steam-playtime-panorama',
		name: 'Steam 游玩时光全景图',
		summary: '把一个或多个 Steam 账号的公开游玩时长排成一张游戏封面全景图。',
		kind: 'online',
		category: 'games',
		status: 'available',
		capabilities: ['多账号累计', '游玩排行榜', 'PNG 导出'],
		accent: 'cyan',
		featured: true,
		primaryAction: {
			label: '立即使用',
			href: 'https://playtime.269332.xyz',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/yundan125/playtime-panorama',
			external: true,
		},
	},
	{
		id: 'overwatch-hero-quiz',
		name: '守望先锋看图猜英雄',
		summary: '只看英雄图标或全身照，为每位英雄猜一个名字，提交后再揭晓答案。',
		kind: 'online',
		category: 'games',
		status: 'available',
		capabilities: ['图标或全身照', '本地保存进度', '结果分享'],
		accent: 'amber',
		featured: true,
		primaryAction: {
			label: '立即使用',
			href: '/overwatch-hero-quiz/',
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/yundan125/overwatch-hero-quiz',
			external: true,
		},
	},
];

export const catalogItems = [...projects, ...gameTools];

export function getCatalogCategory(id: CatalogCategoryId) {
	return catalogCategories.find((category) => category.id === id)!;
}

export function getCatalogItem(id: string) {
	const item = catalogItems.find((entry) => entry.id === id);

	if (!item) {
		throw new Error(`Missing catalog item: ${id}`);
	}

	return item;
}
