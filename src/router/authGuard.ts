import { RouteLocation } from "vue-router";

const haveAuthGuard = (_to: RouteLocation, _from: RouteLocation, next: any) => {

  const token = localStorage.getItem("token");

  if (token) {
    // queremos navegar!
    next();
  } else {
    next({ name: "login" });
  }
};

export default haveAuthGuard;