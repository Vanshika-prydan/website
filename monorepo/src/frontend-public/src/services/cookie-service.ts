import { Cookies } from "react-cookie";
import store from "../store";
import { CookiesActions } from "../store/cookies";

const cookie = new Cookies();
const COOKIE = {
  IS_COOKIE: "isSetCookie",
  IS_FUNCTIONAL: "isFunctional",
  IS_STATISTIC: "isStatistics",
  IS_MARKETING: "isMarketing",
  IS_ALL: "isAll"
};
export default class CookieService {
  public static defaultLoad() {
    if (CookieService.IsAll()) {
      CookieService.setIsAll(true);
    } else {
      store.dispatch(
        CookiesActions.setIsAllowSetCookie(CookieService.IsSetCookie())
      );
      store.dispatch(
        CookiesActions.setIsAllowFunctional(CookieService.IsFunctional())
      );
      store.dispatch(
        CookiesActions.setIsAllowStatistics(CookieService.IsStatistics())
      );
      store.dispatch(
        CookiesActions.setIsAllowMarketing(CookieService.IsMarketing())
      );
    }
  }

  public static setIsSetCookie(value: boolean) {
    cookie.set(COOKIE.IS_COOKIE, value.toString());
  }

  public static setIsFunctional(value: boolean) {
    cookie.set(COOKIE.IS_FUNCTIONAL, value.toString());
    store.dispatch(CookiesActions.setIsAllowFunctional(value));
  }

  public static setIsStatistics(value: boolean) {
    cookie.set(COOKIE.IS_STATISTIC, value.toString());
    store.dispatch(CookiesActions.setIsAllowStatistics(value));
  }

  public static setIsMarketing(value: boolean) {
    cookie.set(COOKIE.IS_MARKETING, value.toString());
    store.dispatch(CookiesActions.setIsAllowMarketing(value));
  }

  public static setIsAll(value: boolean) {
    cookie.set(COOKIE.IS_ALL, value.toString());
    cookie.set(COOKIE.IS_COOKIE, true);
    store.dispatch(CookiesActions.setIsAllowAll(value));
    store.dispatch(CookiesActions.setIsAllowFunctional(value));
    store.dispatch(CookiesActions.setIsAllowStatistics(value));
    store.dispatch(CookiesActions.setIsAllowMarketing(value));
    store.dispatch(CookiesActions.setIsAllowSetCookie(value));
  }

  public static IsSetCookie(): boolean {
    return cookie.get(COOKIE.IS_COOKIE) === "true";
  }

  public static IsAll(): boolean {
    return cookie.get(COOKIE.IS_ALL) === "true";
  }

  public static IsFunctional(): boolean {
    return cookie.get(COOKIE.IS_FUNCTIONAL) === "true" || CookieService.IsAll();
  }

  public static IsStatistics(): boolean {
    return cookie.get(COOKIE.IS_STATISTIC) === "true" || CookieService.IsAll();
  }

  public static IsMarketing(): boolean {
    return cookie.get(COOKIE.IS_MARKETING) === "true" || CookieService.IsAll();
  }
}
