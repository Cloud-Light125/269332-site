import type { ImageMetadata } from 'astro';
import browserScriptsCategoryIcon from '../assets/categories/scripts.png';
import gameStreamingCategoryIcon from '../assets/categories/game-streaming.png';
import windowsCategoryIcon from '../assets/categories/windows.png';
import cloudlightAutomatorIcon from '../assets/projects/cloudlight-automator/icon.png';
import cloudlightAutomatorScreenshot from '../assets/projects/cloudlight-automator/screenshot.png';
import cloudlightBlizzardAccountSwitch from '../assets/projects/cloudlight-blizzard/account-switch.png';
import cloudlightBlizzardDrops from '../assets/projects/cloudlight-blizzard/drops.png';
import cloudlightBlizzardIcon from '../assets/projects/cloudlight-blizzard/icon.png';
import cloudlightBlizzardRegionFiles from '../assets/projects/cloudlight-blizzard/region-files.png';
import cloudlightBlizzardSettings from '../assets/projects/cloudlight-blizzard/settings.png';
import cloudlightCodexBridgeIcon from '../assets/projects/codex-bridge/icon.png';
import cloudlightCodexBridgeScreenshot from '../assets/projects/codex-bridge/screenshot.png';
import cloudlightCodexBridgeOpenClawCommands from '../assets/projects/codex-bridge/openclaw-commands.png';
import cloudlightCodexBridgeQqChannel from '../assets/projects/codex-bridge/qq-channel.png';
import cloudlightOverwatchYoutubeWatcherIcon from '../assets/projects/cloudlight-overwatch-youtube-watcher/icon.png';
import cloudlightOverwatchYoutubeWatcherScreenshot from '../assets/projects/cloudlight-overwatch-youtube-watcher/screenshot.png';
import cloudlightSoopDropsMinerIcon from '../assets/projects/cloudlight-soop-drops-miner/icon.png';
import cloudlightSoopDropsMinerScreenshot from '../assets/projects/cloudlight-soop-drops-miner/screenshot.png';
import cloudlightXiaomiDeviceDetail from '../assets/projects/cloudlight-xiaomi/device-detail.png';
import cloudlightXiaomiIcon from '../assets/projects/cloudlight-xiaomi/icon.png';
import cloudlightXiaomiQqReminder from '../assets/projects/cloudlight-xiaomi/qq-reminder.png';
import cloudlightXiaomiRouterPresence from '../assets/projects/cloudlight-xiaomi/router-presence.png';
import cloudlightXiaomiScreenshot from '../assets/projects/cloudlight-xiaomi/screenshot.png';
import heyboxPostExportUserscriptIcon from '../assets/projects/heybox-post-export-userscript/icon.png';
import heyboxPostExporterIcon from '../assets/projects/heybox-post-exporter/icon.png';
import heyboxPostExporterScreenshot from '../assets/projects/heybox-post-exporter/screenshot.png';
import microsoftPinyinCleanerIcon from '../assets/projects/microsoft-pinyin-cleaner/icon.png';
import microsoftPinyinCleanerScreenshot from '../assets/projects/microsoft-pinyin-cleaner/screenshot.png';
import mobileHotspotControllerIcon from '../assets/projects/mobile-hotspot-controller/icon.png';
import mobileHotspotControllerScreenshot from '../assets/projects/mobile-hotspot-controller/screenshot.png';
import powerSettingsManagerIcon from '../assets/projects/power-settings-manager/icon.png';
import powerSettingsManagerScreenshot from '../assets/projects/power-settings-manager/screenshot.png';
import shandaPassportLoginHelperIcon from '../assets/projects/shanda-passport-login-helper/icon.png';
import steamPlaytimePanoramaIcon from '../assets/projects/steam-playtime-panorama/icon.png';
import tdmClaimTogglePatcherIcon from '../assets/projects/tdm-claim-toggle-patcher/icon.png';
import tdmClaimTogglePatcherScreenshot from '../assets/projects/tdm-claim-toggle-patcher/screenshot.png';
import twitterXMediaRenamerIcon from '../assets/projects/twitter-x-media-renamer/icon.png';
import twitterXMediaRenamerScreenshot from '../assets/projects/twitter-x-media-renamer/screenshot.png';
import overwatchHeroQuizIcon from '../assets/projects/overwatch-hero-quiz/icon.png';
import cloudlightVideoCompressorIcon from '../assets/projects/cloudlight-video-compressor/icon.png';

export type CatalogKind = 'desktop' | 'online' | 'userscript';
export type CatalogCategoryId = 'windows' | 'game-streaming' | 'games' | 'scripts';
export type CatalogAccent = 'blue' | 'cyan' | 'violet' | 'amber';

export interface CatalogCategory {
	id: CatalogCategoryId;
	name: string;
	description: string;
	icon?: ImageMetadata;
	showOnProjects: boolean;
	showOnHome: boolean;
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
	categories: CatalogCategoryId[];
	status: 'available';
	capabilities: string[];
	accent: CatalogAccent;
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
		icon: windowsCategoryIcon,
		showOnProjects: true,
		showOnHome: true,
	},
	{
		id: 'game-streaming',
		name: '游戏与直播',
		description: '游戏数据、趣味互动和直播活动辅助工具。',
		icon: gameStreamingCategoryIcon,
		showOnProjects: true,
		showOnHome: true,
	},
	{
		id: 'games',
		name: '游戏',
		description: '汇总网页游戏、游戏数据与桌面辅助工具。',
		showOnProjects: false,
		showOnHome: false,
	},
	{
		id: 'scripts',
		name: '浏览器脚本',
		description: '在特定网页中减少重复操作的小型脚本。',
		icon: browserScriptsCategoryIcon,
		showOnProjects: true,
		showOnHome: true,
	},
];

export const projectCategories = catalogCategories.filter((category) => category.showOnProjects);

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
		id: 'cloudlight-blizzard',
		name: 'CloudLight Blizzard',
		summary: '管理多个 Battle.net 账号，自动切换《守望先锋》国服 / 国际服本地文件，并整合 SOOP、YouTube 与 Twitch 掉宝观赛。',
		kind: 'desktop',
		categories: ['game-streaming', 'games'],
		status: 'available',
		capabilities: ['Battle.net 多账号', '国服 / 国际服本地切换', '三平台掉宝与观赛'],
		accent: 'blue',
		icon: cloudlightBlizzardIcon,
		screenshots: [
			{
				image: cloudlightBlizzardAccountSwitch,
				alt: 'CloudLight Blizzard 账号页面，当前账号为国际服，两个已保存账号分别带有国际服和国服标签，并提供战绩、编辑和切换入口',
				caption: '账号页同时显示当前账号和已保存账号，可直接查看区服标签并切换。',
			},
			{
				image: cloudlightBlizzardRegionFiles,
				alt: 'CloudLight Blizzard 区服文件页面，显示当前为国际服、国服与国际服备份均已准备，以及游戏位置、备份位置和切换按钮',
				caption: '区服文件页显示两端准备状态、当前区服和存储位置，并提供国服与国际服恢复入口。',
			},
			{
				image: cloudlightBlizzardDrops,
				alt: 'CloudLight Blizzard 掉宝页面，顶部集中显示 SOOP、YouTube 与 Twitch 的运行状态、统一代理状态和各平台入口',
				caption: '掉宝页把 SOOP、YouTube 与 Twitch 放在同一个入口，并集中显示网络、运行状态和下一步操作。',
			},
			{
				image: cloudlightBlizzardSettings,
				alt: 'CloudLight Blizzard 设置页面，显示托盘与开机启动选项、Battle.net 路径、掉宝网络代理和软件版本信息',
				caption: '设置页集中管理托盘、开机启动、主题、Battle.net 路径、三平台共用代理与软件更新。',
			},
		],
		detailsPath: '/projects/cloudlight-blizzard/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/Cloud-Light125/CloudLight-Blizzard/releases',
			external: true,
		},
		secondaryAction: {
			label: '查看 GitHub',
			href: 'https://github.com/Cloud-Light125/CloudLight-Blizzard',
			external: true,
		},
		ctaNote: '适用于 Windows 10/11 x64，需要 .NET 8 Windows Desktop Runtime；在 Releases 页面选择版本。',
	},
	{
		id: 'cloudlight-video-compressor',
		name: 'CloudLight Video Compressor',
		summary: '批量扫描视频，判断哪些值得压缩，为每个视频生成合适的压缩方案，再批量执行并查看前后结果。',
		kind: 'desktop',
		categories: ['windows'],
		status: 'available',
		capabilities: ['批量扫描与分析', '每个视频独立规划', 'QSV / NVENC / AMF'],
		accent: 'blue',
		icon: cloudlightVideoCompressorIcon,
		detailsPath: '/projects/cloudlight-video-compressor/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/Cloud-Light125/CloudLight-Video-Compressor/releases',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/Cloud-Light125/CloudLight-Video-Compressor',
			external: true,
		},
		ctaNote: '安装包包含 .NET 8 Windows Desktop Runtime、FFmpeg 和 ffprobe；在 Releases 页面选择版本。',
	},
	{
		id: 'cloudlight-automator',
		name: 'CloudLight 自动化工作室',
		englishName: 'CloudLight Automator',
		summary: '用可视化流程组合窗口、截图、图像识别、文字识别和键鼠操作。',
		kind: 'desktop',
		categories: ['windows'],
		status: 'available',
		capabilities: ['可视化流程', '图像与文字识别', '键鼠操作'],
		accent: 'violet',
		icon: cloudlightAutomatorIcon,
		screenshot: cloudlightAutomatorScreenshot,
		screenshotAlt: 'CloudLight 自动化工作室的可视化工作流编辑界面',
		screenshotCaption: '在节点画布中连接自动化步骤，并在右侧设置窗口、识别和输入参数。',
		detailsPath: '/projects/cloudlight-automator/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/Cloud-Light125/cloudlight-automator/releases',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/Cloud-Light125/cloudlight-automator',
			external: true,
		},
	},
	{
		id: 'cloudlight-codex-bridge',
		name: 'CloudLight Codex 桥接器',
		englishName: 'CloudLight Codex Bridge',
		summary: '在 Windows 上浏览并继续 Codex / OpenClaw 会话，也可以通过 QQ 或 Telegram 远程选择会话、发送任务并接收最终回复。',
		kind: 'desktop',
		categories: ['windows'],
		status: 'available',
		capabilities: ['Codex / OpenClaw', 'QQ 与 Telegram', '继续已有会话'],
		accent: 'cyan',
		icon: cloudlightCodexBridgeIcon,
		screenshots: [
			{
				image: cloudlightCodexBridgeScreenshot,
				alt: 'CloudLight Codex Bridge 的 OpenClaw Sessions 页面，显示会话列表、Gateway 地址和当前会话消息',
				caption: 'OpenClaw 会话页可以浏览 Gateway 中的 Session，查看消息并继续发送任务。',
			},
			{
				image: cloudlightCodexBridgeOpenClawCommands,
				alt: 'CloudLight Codex Bridge 的 OpenClaw 指令页面，显示已加载指令、QQ 与 Telegram 共用配置和指令编辑入口',
				caption: '指令页可以解锁编辑、改名、添加别名、停用或恢复内置指令，也能创建自定义指令。',
			},
			{
				image: cloudlightCodexBridgeQqChannel,
				alt: 'CloudLight Codex Bridge 的 QQ Bot Profile 页面，显示 QQ 机器人连接状态、OpenID 和分配后端入口',
				caption: 'QQ Bot 页面集中管理连接、允许的 OpenID，以及消息转发到 Codex 或 OpenClaw 的后端。',
			},
		],
		detailsPath: '/projects/cloudlight-codex-bridge/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/Cloud-Light125/Codex-Bridge/releases',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/Cloud-Light125/Codex-Bridge',
			external: true,
		},
		ctaNote: '完整安装包包含 .NET 8 Windows 桌面运行环境；在 Releases 页面选择版本。',
	},
	{
		id: 'cloudlight-xiaomi',
		name: 'CloudLight XiaoMi',
		summary: '查看 Xiaomi 账号下的米家设备，并继续记录小米路由器设备的在线 / 离线历史、时长和时间轴。',
		kind: 'desktop',
		categories: ['windows'],
		status: 'available',
		capabilities: ['Xiaomi 账号设备', '米家设备控制', '路由器 Presence 历史'],
		accent: 'amber',
		icon: cloudlightXiaomiIcon,
		screenshots: [
			{
				image: cloudlightXiaomiScreenshot,
				alt: 'CloudLight XiaoMi 新版设备页，显示已连接的 Xiaomi 账号、当前路由器、在线筛选和路由器、智能插座、手机等设备卡片',
				caption: '设备页先展示当前 Xiaomi 账号下的设备，卡片包含类型、家庭 / 房间、型号、状态，并提供详情或可用的开关入口。',
			},
			{
				image: cloudlightXiaomiDeviceDetail,
				alt: 'CloudLight XiaoMi 主体详情页，显示 24 小时、3 天、7 天和 30 天统计、在线时间分布与最近活动',
				caption: '主体详情把在线时长、时间轴、最近活动和未记录的时间段放在同一页。',
			},
			{
				image: cloudlightXiaomiRouterPresence,
				alt: 'CloudLight XiaoMi 路由器 Presence 页面，显示在线、离线、未知筛选、主体在线时长和关联设备',
				caption: '路由器 Presence 页面继续记录联网设备的当前状态、在线时长、当前连接和关联设备。',
			},
			{
				image: cloudlightXiaomiQqReminder,
				alt: 'CloudLight XiaoMi 独立 QQ 提醒页面，显示 QQ Bot 状态、接收目标、自动提醒规则和连接异常提醒入口',
				caption: 'QQ提醒现在是独立入口，可以配置 Bot、接收目标、连续状态提醒和连接异常提醒。',
			},
		],
		detailsPath: '/projects/cloudlight-xiaomi/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/Cloud-Light125/CloudLight-XiaoMi/releases',
			external: true,
		},
		secondaryAction: {
			label: '查看 GitHub',
			href: 'https://github.com/Cloud-Light125/CloudLight-XiaoMi',
			external: true,
		},
		ctaNote: '网站功能说明包含当前 main 已实现内容；公开下载版本请以 Releases 页面为准。',
	},
	{
		id: 'twitter-x-media-renamer',
		name: 'Twitter/X 媒体文件批量改名工具',
		englishName: 'TwitterXMediaRenamer',
		summary: '根据帖子正文批量重命名下载的 Twitter/X 图片和视频，执行前可先预览结果。',
		kind: 'desktop',
		categories: ['windows'],
		status: 'available',
		capabilities: ['自动识别帖子', '改名前预览', '避免重名覆盖'],
		accent: 'blue',
		icon: twitterXMediaRenamerIcon,
		screenshot: twitterXMediaRenamerScreenshot,
		screenshotAlt: 'Twitter/X 媒体文件批量改名工具的文件扫描与重命名预览界面',
		screenshotCaption: '选择媒体文件夹后，扫描帖子 ID、获取正文并在表格中预览新的文件名。',
		detailsPath: '/projects/twitter-x-media-renamer/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/Cloud-Light125/TwitterXMediaRenamer/releases',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/Cloud-Light125/TwitterXMediaRenamer',
			external: true,
		},
		ctaNote: '在 Releases 页面选择 Windows 单文件程序，无需安装 Python。',
	},
	{
		id: 'heybox-post-exporter',
		name: '小黑盒帖子完整导出工具',
		englishName: 'HeyboxPostExporter',
		summary: '把小黑盒原帖、评论、楼中楼和图片完整保存为 HTML、Markdown 与 JSON。',
		kind: 'desktop',
		categories: ['windows'],
		status: 'available',
		capabilities: ['评论与楼中楼', '三种导出格式', '图片本地保存'],
		accent: 'amber',
		icon: heyboxPostExporterIcon,
		screenshot: heyboxPostExporterScreenshot,
		screenshotAlt: '小黑盒帖子完整导出工具的 Edge 连接状态、导出选项与运行日志界面',
		screenshotCaption: '确认 Edge 已连接后，选择图片和导出格式，再开始保存帖子内容。',
		detailsPath: '/projects/heybox-post-exporter/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/Cloud-Light125/HeyboxPostExporter/releases',
			external: true,
		},
		secondaryAction: {
			label: '查看 GitHub',
			href: 'https://github.com/Cloud-Light125/HeyboxPostExporter',
			external: true,
		},
		ctaNote: '提供 Windows 10/11 x64 单文件程序；使用前还需要准备 Microsoft Edge 和 Node.js。',
	},
	{
		id: 'cloudlight-overwatch-youtube-watcher',
		name: '守望先锋 YouTube 直播观看助手',
		englishName: 'CloudLight Overwatch YouTube Watcher',
		summary: '定时查找指定 YouTube 频道的直播，并用本机 Chrome 或 Brave 打开和维持播放。',
		kind: 'desktop',
		categories: ['game-streaming', 'games'],
		status: 'available',
		capabilities: ['自动查找直播', '多个浏览器 Profile', '手动 URL 模式'],
		accent: 'violet',
		icon: cloudlightOverwatchYoutubeWatcherIcon,
		screenshot: cloudlightOverwatchYoutubeWatcherScreenshot,
		screenshotAlt: '守望先锋 YouTube 直播观看助手的观看模式、直播地址与运行日志界面',
		screenshotCaption: '在观看页选择自动检测频道或手动直播 URL，并查看当前播放状态。',
		detailsPath: '/projects/cloudlight-overwatch-youtube-watcher/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/Cloud-Light125/CloudLight-Overwatch-YouTube-Watcher/releases',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/Cloud-Light125/CloudLight-Overwatch-YouTube-Watcher',
			external: true,
		},
		ctaNote: '在 Releases 页面选择 Windows 程序；运行时需要已安装并更新的 Chrome 或 Brave。',
	},
	{
		id: 'cloudlight-soop-drops-miner',
		name: 'CloudLight SOOP 掉宝挂机工具',
		englishName: 'CloudLight SOOP Drops Miner',
		summary: '集中管理多个 SOOP Live 账号，按任务选择直播间并查看掉宝进度。',
		kind: 'desktop',
		categories: ['game-streaming', 'games'],
		status: 'available',
		capabilities: ['多账号管理', '智能选台', '奖励进度'],
		accent: 'amber',
		icon: cloudlightSoopDropsMinerIcon,
		screenshot: cloudlightSoopDropsMinerScreenshot,
		screenshotAlt: 'CloudLight SOOP Drops Miner 的多账号任务管理界面',
		screenshotCaption: '在一个窗口中查看账号、直播间、掉宝任务进度和已获得奖励。',
		detailsPath: '/projects/cloudlight-soop-drops-miner/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/Cloud-Light125/cloudlight-soop-drops-miner/releases',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/Cloud-Light125/cloudlight-soop-drops-miner',
			external: true,
		},
	},
	{
		id: 'microsoft-pinyin-cleaner',
		name: '微软拼音清理工具',
		englishName: 'MicrosoftPinyinCleaner',
		summary: '移除 Windows 更新后重新加入的微软拼音，同时保留其他中文输入法。',
		kind: 'desktop',
		categories: ['windows'],
		status: 'available',
		capabilities: ['一键检测', '安全移除', '登录自动检查'],
		accent: 'blue',
		icon: microsoftPinyinCleanerIcon,
		screenshot: microsoftPinyinCleanerScreenshot,
		screenshotAlt: '微软拼音清理工具的检测与清理界面',
		screenshotCaption: '检测当前用户输入法列表，并选择立即清理或登录时自动检查。',
		detailsPath: '/projects/microsoft-pinyin-cleaner/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/Cloud-Light125/MicrosoftPinyinCleaner/releases',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/Cloud-Light125/MicrosoftPinyinCleaner',
			external: true,
		},
	},
	{
		id: 'power-settings-manager',
		name: 'Windows 高级电源设置管理器',
		englishName: 'PowerSettingsManager',
		summary: '集中查看和管理 Windows 中隐藏的高级电源设置。',
		kind: 'desktop',
		categories: ['windows'],
		status: 'available',
		capabilities: ['隐藏设置扫描', '批量显示或隐藏', '修改前备份'],
		accent: 'cyan',
		icon: powerSettingsManagerIcon,
		screenshot: powerSettingsManagerScreenshot,
		screenshotAlt: 'Windows 高级电源设置管理器的扫描结果列表',
		screenshotCaption: '按名称、分组和显示状态筛选高级电源设置，再进行显示、隐藏或恢复。',
		detailsPath: '/projects/power-settings-manager/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/Cloud-Light125/PowerSettingsManager/releases',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/Cloud-Light125/PowerSettingsManager',
			external: true,
		},
	},
	{
		id: 'mobile-hotspot-controller',
		name: 'Windows 移动热点控制器',
		englishName: 'MobileHotspotController',
		summary: '在设备支持时创建不依赖互联网的 Windows 局域网热点。',
		kind: 'desktop',
		categories: ['windows'],
		status: 'available',
		capabilities: ['离线局域网', '热点控制', '设备诊断'],
		accent: 'blue',
		icon: mobileHotspotControllerIcon,
		screenshot: mobileHotspotControllerScreenshot,
		screenshotAlt: 'Windows 移动热点控制器的热点设置与状态界面',
		screenshotCaption: '选择系统热点或仅局域网模式，并查看 Wi-Fi Direct 检测与连接状态。',
		detailsPath: '/projects/mobile-hotspot-controller/',
		primaryAction: {
			label: '下载 Windows 版',
			href: 'https://github.com/Cloud-Light125/MobileHotspotController/releases',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/Cloud-Light125/MobileHotspotController',
			external: true,
		},
	},
	{
		id: 'tdm-claim-toggle-patcher',
		name: 'TwitchDropsMiner 领取开关补丁工具',
		englishName: 'TDM Claim Toggle Patcher',
		summary: '为 TwitchDropsMiner 增加可关闭的自动领取开关，并在修改前检查兼容性。',
		kind: 'desktop',
		categories: ['game-streaming', 'games'],
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
			href: 'https://github.com/Cloud-Light125/tdm-claim-toggle-patcher/releases',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/Cloud-Light125/tdm-claim-toggle-patcher',
			external: true,
		},
	},
	{
		id: 'heybox-post-export-userscript',
		name: '小黑盒帖子完整展开与导出',
		summary: '不安装桌面程序，直接在小黑盒帖子页面展开全文、评论和楼中楼并导出 HTML。',
		kind: 'userscript',
		categories: ['scripts'],
		status: 'available',
		capabilities: ['完整展开内容', '原网页与阅读版', '离线保存图片'],
		accent: 'cyan',
		icon: heyboxPostExportUserscriptIcon,
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
		categories: ['scripts'],
		status: 'available',
		capabilities: ['自动填写账号', '本地保存', '不自动提交'],
		accent: 'amber',
		icon: shandaPassportLoginHelperIcon,
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
		categories: ['games'],
		status: 'available',
		capabilities: ['多账号累计', '游玩排行榜', 'PNG 导出'],
		accent: 'cyan',
		icon: steamPlaytimePanoramaIcon,
		primaryAction: {
			label: '立即使用',
			href: 'https://playtime.269332.xyz',
			external: true,
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/Cloud-Light125/playtime-panorama',
			external: true,
		},
	},
	{
		id: 'overwatch-hero-quiz',
		name: '守望先锋看图猜英雄',
		summary: '只看英雄图标或全身照，为每位英雄猜一个名字，提交后再揭晓答案。',
		kind: 'online',
		categories: ['games'],
		status: 'available',
		capabilities: ['图标或全身照', '本地保存进度', '结果分享'],
		accent: 'amber',
		icon: overwatchHeroQuizIcon,
		primaryAction: {
			label: '立即使用',
			href: '/overwatch-hero-quiz/',
		},
		secondaryAction: {
			label: '查看源码',
			href: 'https://github.com/Cloud-Light125/overwatch-hero-quiz',
			external: true,
		},
	},
];

export const catalogItems = [...projects, ...gameTools];

export function getCatalogCategory(id: CatalogCategoryId) {
	return catalogCategories.find((category) => category.id === id)!;
}

export type CatalogCategoryScope = 'projects' | 'tools' | 'all';

export function getCatalogCategories(item: CatalogItem, scope: CatalogCategoryScope = 'projects') {
	const categories = item.categories.map(getCatalogCategory);
	if (scope === 'all') return categories;

	const projectCategories = categories.filter((category) => category.showOnProjects);
	return scope === 'tools' && projectCategories.length === 0 ? categories : projectCategories;
}

export function hasCatalogCategory(item: CatalogItem, id: CatalogCategoryId) {
	return item.categories.includes(id);
}

export function getCatalogItem(id: string) {
	const item = catalogItems.find((entry) => entry.id === id);

	if (!item) {
		throw new Error(`Missing catalog item: ${id}`);
	}

	return item;
}
