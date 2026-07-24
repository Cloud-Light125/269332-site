export interface CatalogItem {
	name: string;
	summary: string;
	repository: string;
	website?: string;
	websiteLabel?: string;
	repositoryLabel?: string;
	category: string;
	status: string;
	visibility: 'public' | 'private';
	tags: string[];
}

export const gameTools: CatalogItem[] = [
	{
		name: 'Steam 游玩时光全景图',
		summary:
			'根据一个或多个 Steam 账号的公开游戏时长生成封面全景图。游玩越久，游戏封面越醒目；相同游戏的时长可跨账号累计，并支持排行榜和 PNG 图片导出。',
		repository: 'https://github.com/yundan125/playtime-panorama',
		website: 'https://playtime.269332.xyz',
		websiteLabel: '立即使用',
		repositoryLabel: '查看源码',
		category: 'Steam / 数据可视化',
		status: '可用',
		visibility: 'public',
		tags: ['Steam', '数据可视化', 'Cloudflare Workers', 'TypeScript'],
	},
	{
		name: '守望先锋看图猜英雄',
		summary:
			'面向没玩过《守望先锋》的玩家制作的第一印象猜名游戏。根据英雄图标或全身照，从名称池中为每位英雄分配名字并填写理由，提交后再揭晓真实名称和猜测结果。',
		repository: 'https://github.com/yundan125/overwatch-hero-quiz',
		website: '/overwatch-hero-quiz/',
		category: '守望先锋 / 英雄猜名',
		status: '可用',
		visibility: 'public',
		tags: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
	},
	{
		name: 'OWCS Predictor',
		summary:
			'面向 OWCS 2026 Midseason Championship 小组赛的浏览器对战预测器，支持选择胜者、录入比分、编辑赛事配置、导入导出和本地保存。',
		repository: 'https://github.com/yundan125/OWCS-Predictor',
		category: '电竞 / 预测工具',
		status: '开发中',
		visibility: 'public',
		tags: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
	},
];

export const projects: CatalogItem[] = [
	{
		name: 'PowerSettingsManager',
		summary:
			'面向 Windows 10/11 的简体中文 WPF 桌面工具，用于检测和管理经典高级电源设置的可见性，并提供扫描快照、备份和安全恢复。',
		repository: 'https://github.com/yundan125/PowerSettingsManager',
		category: 'Windows 桌面工具',
		status: '开发中',
		visibility: 'public',
		tags: ['.NET 8', 'WPF', 'PowerCfg', 'Windows 注册表'],
	},
	{
		name: 'MobileHotspotController',
		summary:
			'Windows 11 移动热点与离线局域网控制器，可管理系统移动热点，并在需要时回退到 Wi-Fi Direct 仅局域网模式。',
		repository: 'https://github.com/yundan125/MobileHotspotController',
		category: 'Windows 桌面工具',
		status: '开发中',
		visibility: 'public',
		tags: ['.NET 8', 'WPF', 'WinRT', 'Wi-Fi Direct'],
	},
	{
		name: 'TDM Claim Toggle Patcher',
		summary:
			'用于 TwitchDropsMiner 源码的可审计补丁工具，增加可持久化的自动领取 Drops 开关，并提供兼容性检测、备份、恢复以及 GUI/CLI。',
		repository: 'https://github.com/yundan125/tdm-claim-toggle-patcher',
		category: '源码补丁工具',
		status: '开发中',
		visibility: 'public',
		tags: ['Python', 'AST', 'GUI / CLI', 'TwitchDropsMiner'],
	},
];
