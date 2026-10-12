import {ActivityMenu} from "@mail/core/web/activity_menu";
import {patch} from "@web/core/utils/patch";
import {user} from "@web/core/user";
import { useRef } from "@web/owl2/utils";

patch(ActivityMenu.prototype, {
  setup() {
    super.setup();
    this.currentFilter = "my";
    this.rootRef = useRef("mail_activity_team_dropdown");
  },
  activateFilter(filter_el) {
    this.deactivateButtons();

    filter_el.classList.add("active");
    this.currentFilter = filter_el.dataset.filter;
    this.updateTeamActivitiesContext();
    this.store.fetchStoreData("systray_get_activities");
  },
  updateTeamActivitiesContext() {
    var active = false;
    if (this.currentFilter === "team") {
      active = true;
    }
    user.updateContext({team_activities: active});
  },
  onBeforeOpen() {
    user.updateContext({team_activities: false});
    super.onBeforeOpen();
  },

  deactivateButtons() {
    this.rootRef.el.querySelector(".o_filter_nav_item").classList.remove("active");
  },
  onClickActivityFilter(filter) {
    this.activateFilter(this.rootRef.el.querySelector("." + filter));
  },
});
