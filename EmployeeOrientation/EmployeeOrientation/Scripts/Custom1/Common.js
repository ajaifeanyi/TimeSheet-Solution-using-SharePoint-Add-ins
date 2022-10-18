"use strict";
$.support.cors = true;
var commonDateFormat = "yy-mm-dd";
var commonDateFormat2 = "YYYY-MM-DD";
var commonDateFormatWithHour = "YYYY-MM-DD HH:mm";
var sharepointDateFormat = "YYYY-MM-DDTHH:mm:ssZZ";
var rowLimiterFilter = "";
var CurrentUser = {
    Name: "",
    Id: 0,
    Email: "",
    IsAdmin: false,
    IsManager: false
};
var SystemSettings = {
    PeriodType: "",
    AppInitExecuted: ""
};
var RequestStatusEnum = {
    Draft: {
        Name: "Draft",
        Value: "Draft"
    },
    PendingApproval: {
        Name: "Pending Approval",
        Value: "Pending Approval"
    },
    Rejected: {
        Name: "Rejected",
        Value: "Rejected"
    },
    Approved: {
        Name: "Approved",
        Value: "Approved"
    },
};
function getQueryStringParameter(c) {
    var b = window.location.search.substring(1);
    var e = b.split("&");
    for (var a = 0; a < e.length; a++) {
        var d = e[a].split("=");
        if (d[0] === c) {
            return d[1];
        }
    }
}
function addMessage(a, b) {
    $.notify(a, {
        globalPosition: "top left",
        className: b + " notifyjsCustom",
        clickToHide: true,
        autoHideDelay: 10000
    });
}
String.prototype.StripTags = function () {
    return this.replace(/<[^>]+>/ig, "").replace("null", "");
}
    ;
function isEmpty(a) {
    return (!a || 0 === a.length);
}
function isEven(a) {
    return a % 2 === 0;
}
function getSettingValue(a, b) {
    var c = "";
    $.each(a, function () {
        if (this.EnumValue === b) {
            c = this.SettingValue;
            return;
        }
    });
    return c;
}
function canEditAdminReport(a) {
    if (CurrentUser.IsAdmin === true || a === RequestStatusEnum.Draft.Value || a === RequestStatusEnum.Rejected.Value) {
        return true;
    } else {
        if (a === RequestStatusEnum.PendingApproval.Value) {
            if ((isEmpty(SystemSettings.EditingPendingApproval) || SystemSettings.EditingPendingApproval === "manager" || SystemSettings.EditingPendingApproval === "requester") && (CurrentUser.IsManager)) {
                return true;
            }
        } else {
            if (a === RequestStatusEnum.Approved.Value) {
                if ((SystemSettings.EditingApproved === "manager" || SystemSettings.EditingApproved === "requester") && (CurrentUser.IsManager)) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canEditUserReport(a) {
    if (CurrentUser.IsAdmin === true || a === RequestStatusEnum.Draft.Value || a === RequestStatusEnum.Rejected.Value) {
        return true;
    } else {
        if (a === RequestStatusEnum.PendingApproval.Value) {
            if ((isEmpty(SystemSettings.EditingPendingApproval) || SystemSettings.EditingPendingApproval === "requester")) {
                return true;
            }
            if ((isEmpty(SystemSettings.EditingPendingApproval) || SystemSettings.EditingPendingApproval === "manager" || SystemSettings.EditingPendingApproval === "requester") && (CurrentUser.IsManager)) {
                return true;
            }
        } else {
            if (a === RequestStatusEnum.Approved.Value) {
                if (SystemSettings.EditingApproved === "requester") {
                    return true;
                }
                if ((SystemSettings.EditingApproved === "manager" || SystemSettings.EditingApproved === "requester") && (CurrentUser.IsManager)) {
                    return true;
                }
            }
        }
    }
    return false;
}
function createExportListItem(f, e, c, h, b) {
    if (h === null || h.length === 0) {
        return false;
    }
    if (isEmpty(e.Id) === false) {
        e.RequestURL = appweburl + "/Pages/RequestFormView.html?requestID=" + String(e.Id) + "&SPHostUrl=" + encodeURIComponent(hostweburl) + "&SPAppWebUrl=" + encodeURIComponent(appweburl);
        e.RequestID = e.Id;
    }
    var a = {};
    a.Requester = "RequesterId";
    a.FirstApprover = "FirstApproverId";
    a.SecondApprover = "SecondApproverId";
    var g = f.charAt(0).toUpperCase() + f.slice(1);
    var d = {
        __metadata: {
            type: "SP.Data." + g + "ListItem"
        },
        Title: "Timesheet" + (isEmpty(e.Id) ? "" : " #" + e.Id),
        HideFromDelve: true
    };
    $.each(h, function (i) {
        if (isEmpty(h[i]) === false) {
            if (isEmpty(a[h[i]])) {
                d[h[i]] = e[h[i]];
            } else {
                d[a[h[i]]] = e[a[h[i]]];
            }
        }
    });
    $.each(b, function (i) {
        if (isEmpty(b[i]) === false) {
            d[b[i]] = e[b[i]];
        }
    });
    $.ajax({
        url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('" + f + "')/items?@target='" + hostweburl + "'",
        contentType: "application/json; odata=verbose",
        async: false,
        type: "POST",
        data: JSON.stringify(d),
        headers: {
            accept: "application/json;odata=verbose",
            "x-requestforceauthentication": true,
            "X-RequestDigest": c
        }
    });
}
function openPopupWindow(e, j, i, h, d) {
    var a = parseInt((window.screen.availWidth - i) / 2);
    var b = parseInt(((window.screen.availHeight - h) / 2) - 50);
    var c = " ,status=no, location=no, scrollbars=yes, resizable=no";
    var g = "width=" + i + ",height=" + h + ",left=" + a + ",top=" + b + c;
    var f = window.open(e, "expensesapprovalsystem", g);
    f.focus();
    return f;
}
var hostweburl = getQueryStringParameter("SPHostUrl");
var appweburl = getQueryStringParameter("SPAppWebUrl");
if (typeof hostweburl !== "undefined" && appweburl !== "undefined") {
    hostweburl = decodeURIComponent(hostweburl);
    appweburl = decodeURIComponent(appweburl);
    $.cookie("hostweburl", hostweburl, {
        expires: 365
    });
    $.cookie("appweburl", appweburl, {
        expires: 365
    });
} else {
    hostweburl = $.cookie("hostweburl");
    appweburl = $.cookie("appweburl");
    if (typeof appweburl === "undefined") {
        location.href = "AuthError.aspx";
    }
}
$(document).ready(function () {
    $.ajax({
        url: appweburl + "/_api/web/currentUser",
        method: "GET",
        cache: false,
        async: false,
        headers: {
            Accept: "application/json; odata=verbose"
        },
        success: function (b) {
            CurrentUser.Name = b.d.Title;
            CurrentUser.Id = b.d.Id;
            CurrentUser.Email = b.d.Email;
            CurrentUser.LoginName = b.d.LoginName;
            var c = $.cookie("rbxc");
            if (window.location.href.indexOf("Default.html") >= 0) {
                $.removeCookie("rbxc");
                c = null;
            }
            if (isEmpty(c)) {
                $.ajax({
                    url: appweburl + "/_vti_bin/ListData.svc/UserRoles/?$select=RoleName&$filter=EmployeeId eq " + CurrentUser.Id,
                    type: "GET",
                    async: false,
                    cache: false,
                    headers: {
                        accept: "application/json;odata=verbose"
                    },
                    dataType: "json",
                    success: function (d) {
                        if (d.d.results.length > 0) {
                            $.each(d.d.results, function () {
                                if (this.RoleName === "Administrator") {
                                    CurrentUser.IsAdmin = true;
                                    $.cookie("rbxc", "729ef4e25027bc652fc8b5c4d1d902947361fa7c8e7b4905e877823f27331b3", {
                                        expires: 1
                                    });
                                } else {
                                    if (this.RoleName === "Manager" && CurrentUser.IsAdmin === false) {
                                        CurrentUser.IsManager = true;
                                        $.cookie("rbxc", "6d439300980e333f0256d64be2c9f67e86f4493ce25f82498d6db7f4be3d9e6f", {
                                            expires: 1
                                        });
                                    }
                                }
                            });
                        } else {
                            $.cookie("rbxc", "6d439300980e333f0256d64be2c9f67e86f4493ce25f82498d6db7f4beds34c", {
                                expires: 1
                            });
                        }
                    }
                });
            } else {
                if (c === "729ef4e25027bc652fc8b5c4d1d902947361fa7c8e7b4905e877823f27331b3") {
                    CurrentUser.IsAdmin = true;
                } else {
                    if (c === "6d439300980e333f0256d64be2c9f67e86f4493ce25f82498d6db7f4be3d9e6f") {
                        CurrentUser.IsManager = true;
                    }
                }
            }
        },
        error: function () {
            location.href = "AuthError.aspx";
            return;
        }
    });
    $.ajax({
        url: appweburl + "/_vti_bin/ListData.svc/Settings/?$select=Id,PeriodType,AppInitExecuted,WeekNumbering,ReqCount,ProjectsEnabled,CategoryEnabled,BillableHours,BillingAmount,HourlyRate,CurrencySymbol,RequestOnBehalf,AppLogo,AppLogoFile,IntegrationListName,IntegrationStatus,IntegrationListGuid,IntegrationExportTriggers,IntegrationStandardFields,IntegrationCustomFields,DateFieldsMode,PreventDuplicate,MinHours,MaxHours,EditingPendingApproval,EnteringFutureTimesheets,EditingApproved,DailyTotals",
        type: "GET",
        async: false,
        cache: false,
        headers: {
            accept: "application/json;odata=verbose"
        },
        dataType: "json",
        success: function (b) {
            if (b.d.results[0] !== null) {
                SystemSettings.SettingId = b.d.results[0].Id;
                SystemSettings.PeriodType = b.d.results[0].PeriodType;
                SystemSettings.WeekNumbering = b.d.results[0].WeekNumbering;
                SystemSettings.AppInitExecuted = b.d.results[0].AppInitExecuted;
                SystemSettings.ReqCount = b.d.results[0].ReqCount;
                SystemSettings.ProjectsEnabled = b.d.results[0].ProjectsEnabled;
                SystemSettings.CategoryEnabled = b.d.results[0].CategoryEnabled;
                SystemSettings.BillableHours = b.d.results[0].BillableHours === null ? false : b.d.results[0].BillableHours;
                SystemSettings.BillingAmount = b.d.results[0].BillingAmount === null ? false : b.d.results[0].BillingAmount;
                SystemSettings.HourlyRate = isEmpty(b.d.results[0].HourlyRate) ? "task" : b.d.results[0].HourlyRate;
                SystemSettings.CurrencySymbol = isEmpty(b.d.results[0].CurrencySymbol) ? "USD" : b.d.results[0].CurrencySymbol;
                SystemSettings.RequestOnBehalf = isEmpty(b.d.results[0].RequestOnBehalf) ? "admin" : b.d.results[0].RequestOnBehalf;
                SystemSettings.AppLogo = isEmpty(b.d.results[0].AppLogo) ? "standard" : b.d.results[0].AppLogo;
                SystemSettings.AppLogoFile = isEmpty(b.d.results[0].AppLogoFile) ? "" : b.d.results[0].AppLogoFile;
                SystemSettings.IntegrationListName = b.d.results[0].IntegrationListName;
                SystemSettings.IntegrationStatus = b.d.results[0].IntegrationStatus;
                SystemSettings.IntegrationListGuid = b.d.results[0].IntegrationListGuid;
                SystemSettings.IntegrationExportTriggers = b.d.results[0].IntegrationExportTriggers;
                SystemSettings.IntegrationStandardFields = b.d.results[0].IntegrationStandardFields;
                SystemSettings.DateFieldsMode = b.d.results[0].DateFieldsMode;
                SystemSettings.PreventDuplicate = b.d.results[0].PreventDuplicate;
                SystemSettings.MinHours = b.d.results[0].MinHours;
                SystemSettings.MaxHours = b.d.results[0].MaxHours;
                SystemSettings.EditingPendingApproval = b.d.results[0].EditingPendingApproval;
                SystemSettings.EditingApproved = b.d.results[0].EditingApproved;
                SystemSettings.EnteringFutureTimesheets = b.d.results[0].EnteringFutureTimesheets;
                SystemSettings.DailyTotals = b.d.results[0].DailyTotals;
                if (isEmpty(b.d.results[0].IntegrationCustomFields)) {
                    SystemSettings.IntegrationCustomFields = "";
                } else {
                    SystemSettings.IntegrationCustomFields = b.d.results[0].IntegrationCustomFields;
                }
            }
        },
        error: function () {
            SystemSettings.AppInitExecuted = "";
        }
    });
   /* if (SystemSettings.AppInitExecuted === "") {
        SystemSettings.AppInitExecuted = "false";
        CurrentUser.IsAdmin = true;
    }
   if (isEmpty(SystemSettings.ReqCount) === false && parseInt(SystemSettings.ReqCount) !== "NaN") {
        var a = 245000 - parseInt(SystemSettings.ReqCount);
        if (a < 0) {
            rowLimiterFilter = "Id gt " + String(Math.abs(a)) + " and ";
        }
    }*/
    
    $("#userWelcomeMsg").text("Welcome " + CurrentUser.Name);
    $("#containerLeft").loadTemplate("Shared/Menu.html");
    //$('#logoleft').css('background-image', "url('" + appLogoURL + "')");
    $("#previousSiteUrl").prop("href", hostweburl);
    $("#menuExpandButton").click(function () {
        if ($(this).data("name") === "show") {
            $("#containerLeft").animate({
                width: "0px"
            }).hide();
            $(this).data("name", "hide");
        } else {
            $("#containerLeft").animate({
                width: "200px"
            }).show();
            $(this).data("name", "show");
        }
    });
});

 /*   if (CurrentUser.IsAdmin) {
        $('#adminNavPanel').show();
                }

                if (CurrentUser.IsAdmin || CurrentUser.IsManager) {
        $('#manageRequestsPanel').show();
                }

                if (SystemSettings.BillingAmount) {
        $('#linkTotalCostsReport').show();
                }
*/

              

                


      