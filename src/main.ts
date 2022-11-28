import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

const cometChatConfig = environment.cometchat;

const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(cometChatConfig.region)
  .build();

CometChat.init(cometChatConfig.appId, appSetting).then(
  () => {
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
  },
  error => {
    console.log('Initialization failed with error:', error);
  }
);

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
