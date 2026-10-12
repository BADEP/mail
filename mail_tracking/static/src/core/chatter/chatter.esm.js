import {Chatter} from "@mail/chatter/web_portal/chatter";
import {FailedMessage} from "@mail_tracking/components/failed_message/failed_message.esm";
import { proxy } from "@odoo/owl";
import {patch} from "@web/core/utils/patch";

const {proxy} = owl;

Chatter.components = {
  ...Chatter.components,
  FailedMessage,
};

/** @type {import("@mail/core/common/chatter").Chatter} */
const ChatterPatch = {
  setup() {
    super.setup(...arguments);
    this.state = proxy({
      ...this.state,
      showFailedMessageList: true,
    });
  },
  get failed_messages() {
    return this.state.thread?.messages.filter((message) => {
      return message.is_failed_message;
    });
  },
  toggleFailedMessageList() {
    this.state.showFailedMessageList = !this.state.showFailedMessageList;
  },
};

patch(Chatter.prototype, ChatterPatch);
