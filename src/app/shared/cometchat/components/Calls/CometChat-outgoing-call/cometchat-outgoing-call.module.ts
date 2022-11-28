import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatAvatar } from "../../Shared/CometChat-avatar/cometchat-avatar.module";
import { CometChatOutgoingCallComponent } from "./cometchat-outgoing-call/cometchat-outgoing-call.component";

@NgModule({
  declarations: [CometChatOutgoingCallComponent],
  imports: [CommonModule, CometChatAvatar],
  exports: [CometChatOutgoingCallComponent],
})
export class CometChatOutgoingCall {}
