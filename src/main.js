import * as utils from "./utils"
import { Router } from "./lib/router"
import * as commonViews from "./views/common"
import * as discussion from "./views/discussion"

// controllers
import { MentorController } from "./controllers/mentor"
import { DashboardController } from "./controllers/dashboard"

import "./css/features.scss"
import "./css/monolith.css"

const keybindings = () => {
  // todo abstract way more later
  document.addEventListener("keyup", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (event.target.tagName=="INPUT") return;
    if (event.target.tagName=="TEXTAREA") return;

    if (event.key==="n") {
      utils.redirect("/mentor/dashboard/next_solutions")
    }
    if (event.key===";") {
      utils.redirect("/my/notifications")
    }
    if (event.key==="w") {
      document.body.classList.toggle("doublewide")
    }
    if (event.key==="/") {
      discussion.togglePopoutEditor();
    }
    // console.log(ev)
  })

}

const router = new Router();
let app = Router.app

// dashboard
router.get("/mentor/dashboard/next_solutions", app.Dashboard.next_solutions())
router.get("/mentor/dashboard/your_solutions",app.Dashboard.your_solutions())
router.get("/mentor/dashboard/testimonials",app.Dashboard.testimonials())

// solutions
router.get(/^\/solutions\/(?<id>[a-z0-9]+$)/,app.Mentor.solution_not_public())
router.get(/^\/mentor\/solutions\/(?<id>[a-z0-9]+$)/,app.Mentor.solution())



const boot = async () => {
  keybindings();

  commonViews.addNewSolutionsMenuLink();
  commonViews.addFooter();
  commonViews.cleanupBreadcrumbs();

  router.go(location)
}

document.addEventListener("DOMContentLoaded", () => {
  boot();
})


