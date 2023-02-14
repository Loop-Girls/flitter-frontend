import { RouteLocation } from "vue-router";

const haveAuthGuard = (_to: RouteLocation, _from: RouteLocation, next: any) => {

  const token = localStorage.getItem("token");

  if (token) {
    // queremos navegar!
    next();
  } else {
    alert("You must log in");
    next({ name: "login" });
  }
};

export default haveAuthGuard;