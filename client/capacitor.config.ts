import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "com.menshub.app",
	appName: "MensHub",
	webDir: "build",
	server: {
		url: "http://172.20.10.7:3000",
		cleartext: true,
	},
};

export default config;
