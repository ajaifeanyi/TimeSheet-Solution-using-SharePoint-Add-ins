"use strict";
var RequestFormView = window.RequestFormView || {};
RequestFormView = function () {
    var f = function () {
        var n = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (o) {
                n = o.d.GetContextWebInformation.FormDigestValue
            },
            error: function (o, p, q) {
                alert(q)
            }
        });
        return n
    }
        , i = function (n) {
            var o;
            $.ajax({
                url: appweburl + "/_api/web/siteusers?$filter=Id eq " + n,
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (p) {
                    o = p.d.results[0]
                },
                error: function (r, p, q) {
                    alert(q)
                }
            });
            return o
        }
        , g = function (p) {
            var q;
            var n = ",";
            for (var o = 1; o < 31; o++) {
                n += "CustomField" + o + (o < 30 ? "," : "")
            }
            var r = "$select=ID,FirstDayOfPeriod,Created,Modified,RequesterId,SecondApproverId,FirstApproverId,RequesterName,Author/Id,Author/Title,FirstApprover/Title,SecondApprover/Title,FirstApprover/Id,SecondApprover/Id,Title,Status,SchemaInstance,NumberOfApprovers,ApprovalStatus,EnableAttachments,CurrentApproverId,RejectReason,TimeSheetJSON,FirstApprover,SecondApprover,SheetSchemaInstance,TotalHours,WeekNumber,Year,FirstDayOfPeriod,NumberOfDays,Period,Year,ApprovalType,ProjectsEnabled,TitleEnabled,CategoryEnabled,NumberOfDecimalPlaces,BillableHours,BillingAmount,HourlyRate,BillableHoursAmount,BillingAmountTotal,DateFieldsMode" + n;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Requests')/items?" + r + "&$expand=Author/Title,FirstApprover/Title,SecondApprover/Title&$filter=ID eq " + p,
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (s) {
                    q = s.d.results[0]
                },
                error: function (u, s, t) {
                    alert(t)
                }
            });
            return q
        }
        , l = function (u, n, p, t) {
            var s = {
                __metadata: {
                    type: "SP.Data.RequestsListItem"
                },
                Status: RequestStatusEnum.PendingApproval.Value,
                ApprovalStatus: String(n),
                SendEmailOnChange: true,
                ApproveLinkURL: appweburl + "/Pages/RequestFormView.html?requestID=" + u + "&SPHostUrl=" + encodeURIComponent(hostweburl) + "&SPAppWebUrl=" + encodeURIComponent(appweburl)
            };
            var q = h(p);
            if (q != null && q.SubstituteApprover != null) {
                var o = i(q.SubstituteApprover.Id);
                p = String(q.SubstituteApprover.Id);
                if (n == 1) {
                    s.FirstApproverEmail = o.Email;
                    s.FirstApproverId = String(q.SubstituteApprover.Id)
                } else {
                    if (n == 2) {
                        s.SecondApproverEmail = o.Email;
                        s.SecondApproverId = String(q.SubstituteApprover.Id)
                    }
                }
            }
            s.CurrentApproverId = String(p);
            var r = f();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Requests')/getItemByStringId('" + u + "')",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify(s),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": r,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (v) {
                    if (isEmpty(SystemSettings.IntegrationStatus) == false && SystemSettings.IntegrationStatus == "true" && SystemSettings.IntegrationExportTriggers.indexOf("Pending Approval") !== -1) {
                        var w = t;
                        if (isEmpty(w.Status) == false) {
                            w.Status = "Pending Approval"
                        }
                        createExportListItem(SystemSettings.IntegrationListName, w, r, SystemSettings.IntegrationStandardFields.split(","), SystemSettings.IntegrationCustomFields.split(","))
                    }
                    $("#btnSendRequestToApprove").hide();
                    $("#lblStatus").text("Pending Approval");
                    addMessage("Request successfully sent for approval", "success");
                    setTimeout(function () {
                        location.href = "RequestFormView.html?requestID=" + u
                    }, 500)
                },
                error: function (x, v, w) {
                    alert(w)
                }
            })
        }
        , m = function (p, o) {
            var n = f();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Requests')/getItemByStringId('" + p + "')",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.RequestsListItem"
                    },
                    Status: RequestStatusEnum.Approved.Value,
                    SendEmailOnChange: true,
                    ApproveLinkURL: appweburl + "/Pages/RequestFormView.html?requestID=" + p + "&SPHostUrl=" + encodeURIComponent(hostweburl) + "&SPAppWebUrl=" + encodeURIComponent(appweburl)
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": n,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (q) {
                    $("#btnSendRequestToApprove").hide();
                    $("#lblStatus").text("Approved");
                    if (CurrentUser.IsAdmin == false && CurrentUser.IsManager == false) {
                        $("#btnEditRequest").hide()
                    }
                    if (isEmpty(SystemSettings.IntegrationStatus) == false && SystemSettings.IntegrationStatus == "true" && SystemSettings.IntegrationExportTriggers.indexOf("Approved") !== -1) {
                        var r = o;
                        if (isEmpty(r.Status) == false) {
                            r.Status = "Approved"
                        }
                        createExportListItem(SystemSettings.IntegrationListName, r, n, SystemSettings.IntegrationStandardFields.split(","), SystemSettings.IntegrationCustomFields.split(","))
                    }
                    addMessage("Request successfully submitted", "success")
                },
                error: function (s, q, r) {
                    alert(r)
                }
            })
        }
        , a = function (y, t, w, q, p, x, u) {
            var v;
            if (t == true) {
                v = {
                    __metadata: {
                        type: "SP.Data.RequestsListItem"
                    },
                    Status: RequestStatusEnum.Approved.Value,
                    ApprovalStatus: String(w),
                    RejectReason: "",
                    SendEmailOnChange: true
                }
            } else {
                v = {
                    __metadata: {
                        type: "SP.Data.RequestsListItem"
                    },
                    ApprovalStatus: String(w),
                    RejectReason: "",
                    SendEmailOnChange: true
                };
                var r = h(q);
                if (r != null && r.SubstituteApprover != null) {
                    var o = i(r.SubstituteApprover.Id);
                    q = String(r.SubstituteApprover.Id);
                    if (w == 1) {
                        v.FirstApproverEmail = o.Email;
                        v.FirstApproverId = String(r.SubstituteApprover.Id);
                        $("#" + p).text(CurrentUser.Name + " (Approved)")
                    } else {
                        if (w == 2) {
                            v.SecondApproverEmail = o.Email;
                            v.SecondApproverId = String(r.SubstituteApprover.Id)
                        }
                    }
                }
                v.CurrentApproverId = String(q)
            }
            if (u == true) {
                var n = parseInt(x.ApprovalStatus);
                if (n == 1) {
                    v.FirstApproverEmail = CurrentUser.Email;
                    v.FirstApproverId = CurrentUser.Id
                } else {
                    if (n == 2) {
                        v.SecondApproverEmail = CurrentUser.Email;
                        v.SecondApproverId = CurrentUser.Id
                    }
                }
            }
            var s = f();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Requests')/getItemByStringId('" + y + "')",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify(v),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": s,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (z) {
                    $("#btnApproveRequest").hide();
                    $("#btnRejectRequest").hide();
                    if (t) {
                        if (isEmpty(SystemSettings.IntegrationStatus) == false && SystemSettings.IntegrationStatus == "true" && SystemSettings.IntegrationExportTriggers.indexOf("Approved") !== -1) {
                            var A = x;
                            if (isEmpty(A.Status) == false) {
                                A.Status = "Approved"
                            }
                            createExportListItem(SystemSettings.IntegrationListName, A, s, SystemSettings.IntegrationStandardFields.split(","), SystemSettings.IntegrationCustomFields.split(","))
                        }
                        addMessage("Request successfully approved", "success");
                        $("#lblStatus").text("Approved")
                    } else {
                        addMessage("Your approval has been sent", "success")
                    }
                    setTimeout(function () {
                        location.href = "RequestFormView.html?requestID=" + y
                    }, 500)
                },
                error: function (B, z, A) {
                    alert(A)
                }
            })
        }
        , c = function (o) {
            var n;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getByTitle('Requests')/items?$select=Attachments,AttachmentFiles&$expand=AttachmentFiles&$filter=Id eq " + o,
                contentType: "application/json; odata=verbose",
                async: false,
                cache: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                success: function (p) {
                    n = p.d.results[0].AttachmentFiles.results
                },
                error: function (r, p, q) {
                    alert(q)
                }
            });
            return n
        }
        , k = function (u, s, o, t, q) {
            var p = f();
            var r = {
                __metadata: {
                    type: "SP.Data.RequestsListItem"
                },
                Status: RequestStatusEnum.Rejected.Value,
                RejectReason: s,
                SendEmailOnChange: true
            };
            if (q == true) {
                var n = parseInt(t.ApprovalStatus);
                if (n == 1) {
                    r.FirstApproverEmail = CurrentUser.Email;
                    r.FirstApproverId = CurrentUser.Id
                } else {
                    if (n == 2) {
                        r.SecondApproverEmail = CurrentUser.Email;
                        r.SecondApproverId = CurrentUser.Id
                    }
                }
            }
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Requests')/getItemByStringId('" + u + "')",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify(r),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": p,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (v) {
                    if (isEmpty(SystemSettings.IntegrationStatus) == false && SystemSettings.IntegrationStatus == "true" && SystemSettings.IntegrationExportTriggers.indexOf("Rejected") !== -1) {
                        var w = t;
                        if (isEmpty(w.Status) == false) {
                            w.Status = "Rejected"
                        }
                        createExportListItem(SystemSettings.IntegrationListName, w, p, SystemSettings.IntegrationStandardFields.split(","), SystemSettings.IntegrationCustomFields.split(","))
                    }
                    $("#btnApproveRequest").hide();
                    $("#btnRejectRequest").hide();
                    $("#lblRequestStatus").text("Rejected");
                    addMessage("Request successfully rejected", "success");
                    $("#" + o).text(CurrentUser.Name + " (Rejected" + (isEmpty(s) ? "" : ":" + s) + ")");
                    setTimeout(function () {
                        location.href = "RequestFormView.html?requestID=" + u
                    }, 500)
                },
                error: function (x, v, w) {
                    alert(w)
                }
            })
        }
        , d = function (p, n) {
            var o = null;
            if (n == 1) {
                o = (p.FirstApprover != null ? p.FirstApprover.Id : null)
            } else {
                if (n == 2) {
                    o = (p.SecondApprover != null ? p.SecondApprover.Id : null)
                }
            }
            return o
        }
        , b = function (p, o) {
            var n;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Settings?$select=Id&$filter=substringof('," + p + ",',ManagersIDs) and Id eq " + o,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (q) {
                    n = q.d.results
                },
                error: function (s, q, r) {
                    alert(r)
                }
            });
            return n
        }
        , j = function (n, p, q, r, t, o, s) {
            if (q) {
                return true
            }
            if (r) {
                return true
            }
            if (isEmpty(o) == false && p == o) {
                return true
            }
            if (n == p || s == p) {
                return true
            }
            return false
        }
        , h = function (n) {
            var p;
            var o = moment().utc().format(commonDateFormat2);
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/SubstituteApprovers?$select=Id,SubstituteApprover&$expand=SubstituteApprover&$filter=IsActive eq true and ManagerId eq " + n + " and StartDate le datetime'" + o + "T00%3a00%3a00'  and EndDate1 ge datetime'" + o + "T00%3a00%3a00' ",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (q) {
                    p = q.d.results[0]
                },
                error: function (q, r, s) {
                    alert(s)
                }
            });
            return p
        }
        , e = function (s) {
            var o;
            var n = "";
            for (var q = 1; q < 31; q++) {
                n += "CustomField" + q + (q < 30 ? "," : "")
            }
            var p = "Id eq " + s;
            var t = "Id,Created,RequesterName,Id,Status,Created,Period,Year,FirstDayOfPeriod,TotalHours,BillableHoursAmount,BillingAmountTotal,TimeSheetJSON" + (n.length > 0 ? "," + n : "");
            var r = appweburl + "/_vti_bin/ListData.svc/Requests/?$filter=" + p + "&$inlinecount=allpages&$select=" + t;
            $.ajax({
                url: r,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (u) {
                    o = u.d.results
                }
            });
            return o
        };
    return {
        getRequestForm: g,
        sendToApprove: l,
        submit: m,
        approveRequest: a,
        rejectRequest: k,
        getAllAttachments: c,
        getApproverByApprovalStatus: d,
        hasAccessToRequest: j,
        getSubstituteApproverByManagerId: h,
        getDataToExport: e
    }
}();
String.prototype.nl2br = function () {
    return this.replace(/\n/g, "<br />")
}
    ;
$(document).ready(function () {
    var H = getQueryStringParameter("requestID");
    if (typeof H == "undefined" || $.isNumeric(H) == false) {
        location.href = "NotFound.aspx";
        return
    }
    $("#btnEditRequest").click(function () {
        location.href = "RequestFormEdit.html?requestID=" + H
    });
    $("#btnPrint").click(function () {
        openPopupWindow("PrintForm.html?type=request&requestID=" + H, "Approval Form", 1024, 768, true)
    });
    var G = RequestFormView.getRequestForm(H);
    if (isEmpty(G.NumberOfDecimalPlaces)) {
        G.NumberOfDecimalPlaces = "0.0"
    }
    var w;
    if (G.NumberOfDecimalPlaces == "0") {
        w = 0
    } else {
        if (G.NumberOfDecimalPlaces == "0.0") {
            w = 1
        } else {
            if (G.NumberOfDecimalPlaces == "0.00") {
                w = 2
            }
        }
    }
    if (G == null) {
        location.href = "NotFound.aspx";
        return
    }
    if (RequestFormView.hasAccessToRequest(G.Author.Id, CurrentUser.Id, CurrentUser.IsAdmin, CurrentUser.IsManager, G.Status, G.CurrentApproverId, G.RequesterId) == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    if (G.ApprovalType != "Approver(s) from User Profile") {
        $("#btnSendRequestToApprove").text("Submit")
    }
    var E = parseInt(G.NumberOfApprovers);
    var a = parseInt(G.ApprovalStatus);
    var c = E == 1 ? ["Approver"] : ["1st Approver", "2nd Approver"];
    var b = ["FirstApprover", "SecondApprover"];
    var F = parseInt(G.NumberOfDays);
    for (var D = 0; D < E; D++) {
        var P = G[b[D]].Title;
        var s = D + 1;
        if (E > 1 && G.Status == RequestStatusEnum.PendingApproval.Value) {
            P += " " + (s < a ? "(Approved)" : "(Pending)")
        } else {
            if (E > 1 && G.Status == RequestStatusEnum.Rejected.Value) {
                if (s < a) {
                    P += " (Approved)"
                } else {
                    if (s == a) {
                        if (isEmpty(G.RejectReason) == false) {
                            P += " (Rejected: " + G.RejectReason + ")"
                        } else {
                            P += " (Rejected)"
                        }
                    }
                }
            }
        }
        $("#aRequestDetails").append(FormBuilder.renderSpan(b[D], c[D], P))
    }
    var I = $.parseJSON(G.SchemaInstance);
    $.each(I, function () {
        if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false && isEmpty(this.ColumnName) == false) {
            var Q = G[this.ColumnName] != null ? G[this.ColumnName] : "";
            if (isEmpty(Q)) {
                Q = "&nbsp;"
            }
            if (this.FieldType == "Currency") {
                var i = numeral(Q).format("0,0.00") + " " + SystemSettings.DefaultCurrencyName;
                $("#aRequestDetails").append(FormBuilder.renderSpan(this.ColumnName, this.FieldName, i))
            } else {
                if (this.FieldType == "Multiple Line of Text") {
                    $("#aRequestDetails").append(FormBuilder.renderSpan(this.ColumnName, this.FieldName, Q.nl2br()))
                } else {
                    $("#aRequestDetails").append(FormBuilder.renderSpan(this.ColumnName, this.FieldName, Q))
                }
            }
        }
    });
    var J = false;
    $("#btnSendRequestToApprove").click(function () {
        if (J == true) {
            return
        }
        J = true;
        $("#btnSendRequestToApprove").attr("disabled", "disabled");
        if (G.ApprovalType == "Approver(s) from User Profile") {
            if (G.Status == RequestStatusEnum.Draft.Value) {
                RequestFormView.sendToApprove(H, a + 1, RequestFormView.getApproverByApprovalStatus(G, a + 1), G)
            } else {
                if (G.Status == RequestStatusEnum.Rejected.Value) {
                    RequestFormView.sendToApprove(H, a, RequestFormView.getApproverByApprovalStatus(G, a), G)
                }
            }
        } else {
            RequestFormView.submit(H, G)
        }
    });
    var x = $("#dialog-confirm-approve").dialog({
        autoOpen: false,
        resizable: false,
        height: 140,
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close")
            },
            Approve: function () {
                var Q = (E == a);
                var i = "";
                if (Q == false) {
                    i = RequestFormView.getApproverByApprovalStatus(G, a + 1)
                }
                RequestFormView.approveRequest(H, Q, a + 1, i, b[a - 1], G, false);
                $(this).dialog("close")
            },
        },
        open: function () {
            $(".ui-dialog-buttonpane").find('button:contains("Approve")').focus()
        }
    });
    var y = $("#dialog-confirm-reject").dialog({
        autoOpen: false,
        resizable: false,
        height: 180,
        width: 320,
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close")
            },
            Reject: function () {
                RequestFormView.rejectRequest(H, $("#txtRejectReason").val(), b[a - 1], G, false);
                $(this).dialog("close")
            },
        },
        open: function () {
            $(".ui-dialog-buttonpane").find('button:contains("Reject")').focus()
        }
    });
    var z = $("#dialog-force-confirm-approve").dialog({
        autoOpen: false,
        resizable: false,
        height: 140,
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close")
            },
            Approve: function () {
                var Q = (E == a);
                var i = "";
                if (Q == false) {
                    i = RequestFormView.getApproverByApprovalStatus(G, a + 1)
                }
                RequestFormView.approveRequest(H, Q, a + 1, i, b[a - 1], G, true);
                $(this).dialog("close")
            },
        },
        open: function () {
            $(".ui-dialog-buttonpane").find('button:contains("Approve")').focus()
        }
    });
    var A = $("#dialog-force-confirm-reject").dialog({
        autoOpen: false,
        resizable: false,
        height: 180,
        width: 320,
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close")
            },
            Reject: function () {
                RequestFormView.rejectRequest(H, $("#txtRejectReason").val(), b[a - 1], G, true);
                $(this).dialog("close")
            },
        },
        open: function () {
            $(".ui-dialog-buttonpane").find('button:contains("Reject")').focus()
        }
    });
    if ((G.Author.Id == CurrentUser.Id || G.RequesterId == CurrentUser.Id) && (G.Status == RequestStatusEnum.Draft.Value || G.Status == RequestStatusEnum.Rejected.Value)) {
        $("#btnSendRequestToApprove").show();
        $("#btnSendRequestToApprove").removeAttr("disabled")
    } else {
        if (G.Status == RequestStatusEnum.PendingApproval.Value) {
            $("#btnEditRequest").hide();
            if ((isEmpty(SystemSettings.EditingPendingApproval) || SystemSettings.EditingPendingApproval == "requester") && (G.Author.Id == CurrentUser.Id || G.RequesterId == CurrentUser.Id)) {
                $("#btnEditRequest").show()
            }
            if ((SystemSettings.EditingPendingApproval == "manager") && (CurrentUser.IsAdmin || (CurrentUser.IsManager))) {
                $("#btnEditRequest").show()
            }
            if ((SystemSettings.EditingPendingApproval == "administrator") && (CurrentUser.IsAdmin)) {
                $("#btnEditRequest").show()
            }
            if (RequestFormView.getApproverByApprovalStatus(G, a) == CurrentUser.Id) {
                $("#btnApproveRequest").show();
                $("#btnRejectRequest").show();
                $("#btnApproveRequest").click(function () {
                    x.dialog("open")
                });
                $("#btnRejectRequest").click(function () {
                    y.dialog("open")
                })
            } else {
                if (CurrentUser.IsAdmin == true) {
                    $("#btnForceApproveRequest").show();
                    $("#btnForceRejectRequest").show();
                    $("#btnForceApproveRequest").click(function () {
                        z.dialog("open")
                    });
                    $("#btnForceRejectRequest").click(function () {
                        A.dialog("open")
                    })
                }
            }
        } else {
            if (G.Status == RequestStatusEnum.Approved.Value) {
                $("#btnEditRequest").hide();
                if (SystemSettings.EditingApproved == "requester" && (G.Author.Id == CurrentUser.Id || G.RequesterId == CurrentUser.Id)) {
                    $("#btnEditRequest").show()
                }
                if ((SystemSettings.EditingApproved == "manager") && (CurrentUser.IsAdmin || (CurrentUser.IsManager))) {
                    $("#btnEditRequest").show()
                }
                if (CurrentUser.IsAdmin) {
                    $("#btnEditRequest").show()
                }
                $("#btnApproveRequest").hide();
                $("#btnRejectRequest").hide()
            }
        }
    }
    if (G.EnableAttachments) {
        var f = RequestFormView.getAllAttachments(H);
        if (f.length == 0) {
            $("#noAttachments").show()
        } else {
            var e = $("#aAttachments");
            $.each(f, function () {
                e.append('<div><a target="_blank" href="' + this.ServerRelativeUrl + '" class="attachment" >' + this.FileName + "</a> </div>")
            })
        }
    } else {
        $("#liAttachments").hide();
        $("#aAttachments").hide()
    }
    $("#lblRequesterName").text(G.RequesterName);
    $("#lblPeriod").text(G.Period + " " + G.Year);
    $("#lblPeriodStart").text(G.FirstDayOfPeriod);
    $("#lblStatus").text(G.Status);
    if (G.Status == "Rejected" && G.RejectReason != null) {
        $("#pRejectReason").show();
        $("#lblRejectReason").text(G.RejectReason)
    } else {
        $("#pRejectReason").hide()
    }
    if (G.Status == "Approved" && G.ApproveDate != null) {
        $("#pApproveDate").show();
        $("#lblApproveDate").text(moment(G.ApproveDate).format(commonDateFormatWithHour))
    } else {
        $("#pApproveDate").hide()
    }
    if (G.Notices != null) {
        $("#lblNotices").html(G.Notices.nl2br())
    }
    $("#lblRequestID").text(G.ID);
    $("#lblRequestStatus").text(G.Status);
    $("#lblCreatedDate").text(moment(G.Created).format(commonDateFormatWithHour));
    $("#lblModifiedDate").text(moment(G.Modified).format(commonDateFormatWithHour));
    $("#lblTotal").text(SystemSettings.PeriodType + " hours total: " + G.TotalHours);
    var O = 0;
    G.BillableHours = G.BillableHours == null ? false : G.BillableHours;
    G.BillingAmount = G.BillingAmount == null ? false : G.BillingAmount;
    if (G.BillableHours) {
        $("#lblBillableHours").show();
        $("#lblBillableHours").text("Billable hours: " + numeral(G.BillableHoursAmount).format("0," + G.NumberOfDecimalPlaces))
    }
    if (G.BillingAmount) {
        $("#lblBillingAmountTotal").show();
        $("#lblBillingAmountTotal").text("Total billing amount: " + numeral(G.BillingAmountTotal).format("0," + G.NumberOfDecimalPlaces) + " " + SystemSettings.CurrencySymbol)
    }
    if (G.HourlyRate == "user") {
        O = parseFloat(G.HourlyRate)
    }
    var C = moment(G.FirstDayOfPeriod);
    var K = [];
    var B = [];
    var d = new Array();
    var p = 0;
    var r = 2430;
    if (parseInt(G.NumberOfDays) >= 1) {
        r = 1480
    }
    if (parseInt(G.NumberOfDays) >= 14) {
        r = 1780
    }
    if (parseInt(G.NumberOfDays) >= 25) {
        r = 2430
    }
    if (G.ProjectsEnabled != "false") {
        var l = new Object();
        l.data = "Project";
        l.title = "Project";
        l.width = 250;
        B.push(l);
        p += 250
    }
    if (G.TitleEnabled != "false") {
        var n = new Object();
        n.data = "Title";
        n.title = "Task Title";
        n.width = 350;
        B.push(n);
        p += 350
    }
    if (G.CategoryEnabled != "false") {
        var j = new Object();
        j.data = "Category";
        j.title = "Category";
        j.width = 250;
        B.push(j);
        p += 250
    }
    if (G.BillableHours) {
        var h = new Object();
        h.data = "Billable";
        h.title = "Billable?";
        h.width = 70;
        h.editor = "select";
        h.selectOptions = ["Yes", "No"];
        B.push(h);
        p += 70;
        r += 100
    }
    var u = 0;
    if (G.DateFieldsMode == "ondemand") {
        var k = new Object();
        k.data = "Date";
        k.title = "Date";
        k.width = 100;
        k.type = "date";
        k.showButtonPanel = false;
        k.changeMonth = false;
        k.changeYear = false;
        B.push(k)
    }
    var v = $.parseJSON(G.SheetSchemaInstance);
    var t = new Object();
    $.each(v, function () {
        if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false) {
            var i = new Object();
            i.data = this.FieldName;
            i.title = this.FieldName;
            i.width = (isEmpty(this.Width) ? 200 : Math.round(parseFloat(this.Width)));
            p += (isEmpty(this.Width) ? 200 : Math.round(parseFloat(this.Width)));
            r += i.width;
            if (this.FieldType == "Text") {
                i.type = "text";
                t[this.VariableName] = ""
            } else {
                if (this.FieldType == "Number") {
                    i.type = "numeric";
                    i.format = "0," + G.NumberOfDecimalPlaces;
                    i.language = "en";
                    i.allowInvalid = false;
                    t[this.VariableName] = ""
                } else {
                    if (this.FieldType == "Boolean") {
                        i.type = "checkbox";
                        i.checkedTemplate = "Yes";
                        i.uncheckedTemplate = "No";
                        i.className = "handsonTableCheckbox";
                        t[this.VariableName] = "No"
                    } else {
                        if (this.FieldType == "Choice") {
                            if (this.Options != null) {
                                i.editor = "select";
                                var T = [];
                                var S = this.Options.split(",");
                                for (var R in S) {
                                    var Q = (R != null && S[R] != null ? S[R].trim() : "");
                                    if (Q != "") {
                                        T.push(Q)
                                    }
                                }
                                i.selectOptions = S
                            }
                            t[this.VariableName] = ""
                        } else {
                            if (this.FieldType == "Date") {
                                i.type = "date";
                                i.showButtonPanel = false;
                                i.changeMonth = false;
                                i.changeYear = false;
                                t[this.VariableName] = ""
                            }
                        }
                    }
                }
            }
            B.push(i);
            u++
        }
    });
    if (SystemSettings.DateFieldsMode != "ondemand" && SystemSettings.DailyTotals == "enabled") {
        $("#trDaysSummary").append('<td style="width:' + p + 'px;" ></td>');
        $("#tDaysSummary").show()
    }
    if (G.DateFieldsMode != "ondemand") {
        for (var D = 1; D < parseInt(G.NumberOfDays) + 1; D++) {
            var q = new Object();
            q.data = String(D);
            q.title = " " + C.format("ddd") + "<br/>" + C.format("D/MM");
            q.width = 40;
            q.type = "numeric";
            q.format = G.NumberOfDecimalPlaces,
                B.push(q);
            C.add("d", 1);
            if (SystemSettings.DailyTotals == "enabled") {
                $("#trDaysSummary").append('<td class="totalSumPerDay" id="td' + String(D) + '" >0</td>')
            }
        }
    }
    var o = new Object();
    o.data = "Total";
    o.title = "Total<br/>hours";
    o.width = 50;
    o.readOnly = true;
    if (SystemSettings.DateFieldsMode == "ondemand") {
        o.title = "Total hours";
        o.width = 80
    }
    B.push(o);
    if (G.BillingAmount) {
        var m = new Object();
        m.data = "Rate";
        m.title = "Hourly<br/>rate";
        m.width = 60;
        m.readOnly = true;
        m.type = "numeric";
        m.format = "0," + G.NumberOfDecimalPlaces;
        m.language = "en";
        m.allowInvalid = false;
        B.push(m);
        var g = new Object();
        g.data = "Amount";
        g.title = "Billing<br/>amount";
        g.width = 60;
        g.type = "numeric";
        g.format = "0," + G.NumberOfDecimalPlaces;
        g.language = "en";
        g.allowInvalid = false;
        g.readOnly = true;
        B.push(g);
        r = r + 250
    }
    $(".containerWrapper").width(r);
    $("#divTimeSheet").handsontable({
        data: $.parseJSON(G.TimeSheetJSON),
        startRows: 1,
        className: "htCenter",
        multiSelect: false,
        minSpareRows: 0,
        minSpareCols: 0,
        contextMenu: false,
        autoColumnSize: false,
        readOnly: true,
        columns: B
    });
    var L = $("#divTimeSheet").data("handsontable");
    var M = L.getData();
    if (M.length > 1 && L.isEmptyRow(M.length - 1)) {
        L.alter("remove_row", parseInt(M.length - 1))
    }
    if (SystemSettings.DailyTotals == "enabled") {
        var L = $("#divTimeSheet").data("handsontable");
        var M = L.getData();
        F = parseInt(G.NumberOfDays);
        var N = {};
        for (var D = 1; D < F + 1; D++) {
            N[D] = 0
        }
        $.each(M, function () {
            for (var Q = 1; Q < F + 1; Q++) {
                if (this[Q] != null && isEmpty(this[Q]) == false && $.isNumeric(this[Q])) {
                    N[Q] += parseFloat(this[Q])
                }
            }
        });
        for (var D = 1; D < F + 1; D++) {
            $("#td" + D).html(N[D].toFixed(w))
        }
    }
    $(".ui-dialog-buttonpane").find('button:contains("Approve")').addClass("btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Reject")').addClass("btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Cancel")').addClass("btn");
    $("#btnExportDetailsCSV").click(function (aa) {
        var Z = RequestFormView.getDataToExport(H);
        var R = '","';
        var ai = '"\r\n';
        var S = '"Timesheet Id","Created","User","Period","First Day of Period","Year","Status"';
        var V = "";
        var U = [];
        var Y = "";
        var X = [];
        var aj = $.parseJSON(G.SchemaInstance);
        $.each(aj, function () {
            if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false && isEmpty(this.ColumnName) == false) {
                V += ',"' + this.FieldName + '"';
                U.push(this.ColumnName)
            }
        });
        S += V;
        var W = $.parseJSON(G.SheetSchemaInstance);
        if (G.ProjectsEnabled != "false") {
            X.push("Project");
            Y += ',"Project"'
        }
        if (G.TitleEnabled != "false") {
            X.push("Title");
            Y += ',"Task Title"'
        }
        if (G.CategoryEnabled != "false") {
            X.push("Category");
            Y += ',"Category"'
        }
        if (SystemSettings.DateFieldsMode == "ondemand") {
            Y += ',"Date"';
            X.push("Date")
        }
        $.each(W, function () {
            if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false) {
                Y += ',"' + this.FieldName + '"';
                X.push(this.FieldName)
            }
        });
        var ac = moment(G.FirstDayOfPeriod);
        var ah = parseInt(G.NumberOfDays);
        if (SystemSettings.DateFieldsMode != "ondemand") {
            for (var ad = 1; ad < ah + 1; ad++) {
                Y += (',"' + ac.format("ddd") + " " + ac.format("D/MM") + '"');
                X.push(String(ad));
                ac.add("d", 1)
            }
        }
        Y += ',"Sub Total Hours"';
        X.push("Total");
        if (SystemSettings.BillableHours) {
            Y += ',"Billable?"';
            X.push("Billable")
        }
        if (SystemSettings.BillingAmount) {
            Y += ',"Hourly Rate"';
            X.push("Rate");
            Y += ',"Billing amount"';
            X.push("Amount")
        }
        S += (Y + "\r\n");
        $.each(Z, function () {
            var aq = this.Id;
            var ak = moment(this.Created).format(commonDateFormat2);
            var ar = this.RequesterName;
            var at = this.Status;
            var ap = this.Period;
            var an = this.FirstDayOfPeriod;
            var av = this.Year;
            var am = "";
            for (var ao = 0; ao < U.length; ao++) {
                var al = this[U[ao]] != null ? this[U[ao]] : " ";
                am += al + (ao < U.length - 1 ? R : "")
            }
            var au = $.parseJSON(this.TimeSheetJSON);
            $.each(au, function () {
                var ay = "";
                var aw = 0;
                for (var ax = 0; ax < X.length; ax++) {
                    if (this[X[ax]] != null) {
                        ay += this[X[ax]] + (ax < X.length - 1 ? R : "");
                        aw++
                    } else {
                        ay += "" + (ax < X.length - 1 ? R : "")
                    }
                }
                if (aw > 0) {
                    S += '"' + aq + R + ak + R + ar + R + ap + R + an + R + av + R + at + R + (isEmpty(am) ? "" : am + R) + ay + ai
                }
            })
        });
        var ag = navigator.appName === "Microsoft Internet Explorer";
        var af = (navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Trident\/8\./) ? true : false);
        if (ag && !af) {
            T = decodeURIComponent(S);
            var ae = document.getElementById("csvDownloadFrame");
            ae = ae.contentWindow || ae.contentDocument;
            ae.document.open("text/csv", "replace");
            ae.document.write(T);
            ae.document.close();
            ae.focus();
            ae.document.execCommand("SaveAs", true, "export-timesheets.csv")
        } else {
            if (window.navigator.msSaveOrOpenBlob) {
                var ab = [S];
                var Q = new Blob(ab);
                window.navigator.msSaveBlob(Q, "export-timesheets.csv")
            } else {
                var T = "data:application/csv;charset=utf-8," + encodeURIComponent(S);
                $(this).attr({
                    download: "export-timesheets.csv",
                    href: T,
                    target: "_blank"
                })
            }
        }
    });
    $("#btnExportDetailsXLSX").click(function (aa) {
        var Z = RequestFormView.getDataToExport(H);
        var Q = '","';
        var ag = "";
        var T = '"Timesheet Id","Created","User","Period","First Day of Period","Year","Status"';
        var V = "";
        var U = [];
        var Y = "";
        var X = [];
        var ah = $.parseJSON(G.SchemaInstance);
        $.each(ah, function () {
            if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false && isEmpty(this.ColumnName) == false) {
                V += ',"' + this.FieldName + '"';
                U.push(this.ColumnName)
            }
        });
        T += V;
        var W = $.parseJSON(G.SheetSchemaInstance);
        if (G.ProjectsEnabled != "false") {
            X.push("Project");
            Y += ',"Project"'
        }
        if (G.TitleEnabled != "false") {
            X.push("Title");
            Y += ',"Task Title"'
        }
        if (G.CategoryEnabled != "false") {
            X.push("Category");
            Y += ',"Category"'
        }
        if (SystemSettings.DateFieldsMode == "ondemand") {
            Y += ',"Date"';
            X.push("Date")
        }
        $.each(W, function () {
            if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false) {
                Y += ',"' + this.FieldName + '"';
                X.push(this.FieldName)
            }
        });
        var ab = moment(G.FirstDayOfPeriod);
        var ae = parseInt(G.NumberOfDays);
        if (SystemSettings.DateFieldsMode != "ondemand") {
            for (var ad = 1; ad < ae + 1; ad++) {
                Y += (',"' + ab.format("ddd") + " " + ab.format("D/MM") + '"');
                X.push(String(ad));
                ab.add("d", 1)
            }
        }
        Y += ',"Sub Total Hours"';
        X.push("Total");
        if (SystemSettings.BillableHours) {
            Y += ',"Billable?"';
            X.push("Billable")
        }
        if (SystemSettings.BillingAmount) {
            Y += ',"Hourly Rate"';
            X.push("Rate");
            Y += ',"Billing amount"';
            X.push("Amount")
        }
        T += (Y);
        var S = T.split('","');
        var ai = $("#tableToExport");
        ai.html("");
        var R = S.length;
        var af = $(ai[0].insertRow(-1));
        for (var ad = 0; ad < R; ad++) {
            var ac = $("<th />");
            ac.html(S[ad].replace('"', ""));
            af.append(ac)
        }
        $.each(Z, function () {
            var ap = this.Id;
            var aj = moment(this.Created).format(commonDateFormat2);
            var aq = this.RequesterName;
            var ar = this.Status;
            var ao = this.Period;
            var am = this.FirstDayOfPeriod;
            var au = this.Year;
            var al = "";
            for (var an = 0; an < U.length; an++) {
                var ak = this[U[an]] != null ? this[U[an]] : " ";
                al += ak + (an < U.length - 1 ? Q : "")
            }
            var at = $.parseJSON(this.TimeSheetJSON);
            $.each(at, function () {
                var aB = "";
                var aw = 0;
                for (var ax = 0; ax < X.length; ax++) {
                    if (this[X[ax]] != null) {
                        aB += this[X[ax]] + (ax < X.length - 1 ? Q : "");
                        aw++
                    } else {
                        aB += "" + (ax < X.length - 1 ? Q : "")
                    }
                }
                if (aw > 0) {
                    var az = "" + ap + Q + aj + Q + aq + Q + ao + Q + am + Q + au + Q + ar + Q + (isEmpty(al) ? "" : al + Q) + aB;
                    console.log(al);
                    console.log(aB);
                    var aA = az.split('","');
                    af = $(ai[0].insertRow(-1));
                    for (var ay = 0; ay < R; ay++) {
                        var av = $("<td />");
                        av.html(aA[ay]);
                        af.append(av)
                    }
                }
            })
        });
        ai.tableExport({
            fileName: "export-timesheets",
            worksheetName: "Export",
            type: "xlsx"
        })
    })
});
