"use strict";
var EmailTemplates = window.EmailTemplates || {};
EmailTemplates = function () {
    var c = function () {
        var e = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (f) {
                e = f.d.GetContextWebInformation.FormDigestValue
            },
            error: function (f, g, h) {
                alert(h)
            }
        });
        return e
    }
        , b = function () {
            var e;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('EmailTemplates')/items?$select=ID,RequestSubmittedTitle,RequestSubmittedCC,RequestSubmittedBody,RequestRejectedTitle,RequestRejectedCC,RequestRejectedBody,RequestApprovedTitle,RequestApprovedCC,RequestApprovedBody,RequestAutoApprovedTitle,RequestAutoApprovedCC,RequestAutoApprovedBody",
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (f) {
                    e = f.d.results[0]
                },
                error: function (h, f, g) {
                    alert(g)
                }
            });
            return e
        }
        , d = function (g, e) {
            var f = c();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('EmailTemplates')/getItemByStringId(" + g + ")",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.EmailTemplatesListItem"
                    },
                    RequestSubmittedTitle: e.RequestSubmittedTitle,
                    RequestSubmittedCC: e.RequestSubmittedCC,
                    RequestSubmittedBody: e.RequestSubmittedBody,
                    RequestRejectedTitle: e.RequestRejectedTitle,
                    RequestRejectedCC: e.RequestRejectedCC,
                    RequestRejectedBody: e.RequestRejectedBody,
                    RequestApprovedTitle: e.RequestApprovedTitle,
                    RequestApprovedCC: e.RequestApprovedCC,
                    RequestApprovedBody: e.RequestApprovedBody,
                    RequestAutoApprovedTitle: e.RequestAutoApprovedTitle,
                    RequestAutoApprovedCC: e.RequestAutoApprovedCC,
                    RequestAutoApprovedBody: e.RequestAutoApprovedBody
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": f,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (h) {
                    addMessage("Email templates saved successfully", "success")
                },
                error: function (j, h, i) {
                    alert(i)
                }
            })
        }
        , a = function () {
            var e = c();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('EmailTemplates')/items",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.EmailTemplatesListItem"
                    },
                    RequestSubmittedTitle: "A timesheet for {TimesheetPeriod} has been submitted by {RequesterName} for your approval",
                    RequestSubmittedCC: "",
                    RequestSubmittedBody: "Dear User, <br/><br/>A timesheet for {TimesheetPeriod} has been submitted by {RequesterName} for your approval. <br/> Please open below link to approve or reject request: <br/>{LinkToRequest}<br/><br/>________________________________________________ <br/>This is an automatically generated email, please do not reply.",
                    RequestRejectedTitle: "Your timesheet for {TimesheetPeriod} has been rejected",
                    RequestRejectedCC: "",
                    RequestRejectedBody: "Dear User, <br/><br/>Your timesheet for {TimesheetPeriod} has been rejected. <br/>Click here to see details: {LinkToRequest}<br/><br/>______________________________________________________________ <br/>This is an automatically generated email, please do not reply.",
                    RequestApprovedTitle: "Your timesheet for {TimesheetPeriod} has been approved",
                    RequestApprovedCC: "",
                    RequestApprovedBody: "Dear User, <br/><br/>Your timesheet for {TimesheetPeriod} has been approved. <br/>Click here to see details: {LinkToRequest}  <br/><br/>______________________________________________________________ <br/>This is an automatically generated email, please do not reply.",
                    RequestAutoApprovedTitle: "A timesheet for {TimesheetPeriod} has been submitted by {RequesterName}",
                    RequestAutoApprovedCC: "",
                    RequestAutoApprovedBody: "Dear User, <br/><br/>A timesheet for {TimesheetPeriod} has been submitted by {RequesterName}<br/>Click here to see details: {LinkToRequest}<br/><br/>______________________________________________________________ <br/>This is an automatically generated email, please do not reply."
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": e
                }
            })
        };
    return {
        getEmailTemplate: b,
        updateEmailTemplate: d,
        createEmailTemplateEntry: a
    }
}();
$(window).load(function () {
    if (CurrentUser.IsAdmin == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    var a = EmailTemplates.getEmailTemplate();
    if (a == null) {
        EmailTemplates.createEmailTemplateEntry();
        a = EmailTemplates.getEmailTemplate()
    }
    tinymce.init({
        selector: "textarea",
        toolbar_items_size: "small",
        plugins: ["link hr textcolor table code"],
        menu: {
            edit: {
                title: "Edit",
                items: "undo redo | cut copy paste pastetext | selectall"
            },
            insert: {
                title: "Insert variable",
                items: "requestername linktorequest startdate enddate requesttype"
            },
            format: {
                title: "Format",
                items: "bold italic underline forecolor backcolor | formats | removeformat"
            },
            table: {
                title: "Table",
                items: "inserttable tableprops deletetable | cell row column"
            },
        },
        toolbar1: "bold italic underline forecolor  link unlink anchor hr code fontselect fontsizeselect ",
        toolbar: "mybutton",
        setup: function (b) {
            b.addMenuItem("requestername", {
                text: "Requester Name",
                context: "tools",
                onclick: function () {
                    b.insertContent("{RequesterName}")
                }
            }),
                b.addMenuItem("linktorequest", {
                    text: "Link To Request",
                    context: "tools",
                    onclick: function () {
                        b.insertContent("{LinkToRequest}")
                    }
                }),
                b.addMenuItem("requestId", {
                    text: "Request ID",
                    context: "tools",
                    onclick: function () {
                        b.insertContent("{RequestID}")
                    }
                }),
                b.addMenuItem("requestTitle", {
                    text: "Request Title",
                    context: "tools",
                    onclick: function () {
                        b.insertContent("{RequestTitle}")
                    }
                })
        }
    });
    setTimeout(function () {
        $("#txtRequestSubmittedTitle").val(a.RequestSubmittedTitle);
        $("#txtRequestSubmittedCC").val(a.RequestSubmittedCC);
        tinymce.get("taRequestSubmittedBody").setContent(a.RequestSubmittedBody);
        $("#txtRequestRejectedTitle").val(a.RequestRejectedTitle);
        $("#txtRequestRejectedCC").val(a.RequestRejectedCC);
        tinymce.get("taRequestRejectedBody").setContent(a.RequestRejectedBody);
        $("#txtRequestApprovedTitle").val(a.RequestApprovedTitle);
        $("#txtRequestApprovedCC").val(a.RequestApprovedCC);
        tinymce.get("taRequestApprovedBody").setContent(a.RequestApprovedBody);
        $("#txtRequestAutoApprovedTitle").val(a.RequestAutoApprovedTitle);
        $("#txtRequestAutoApprovedCC").val(a.RequestAutoApprovedCC);
        tinymce.get("taRequestAutoApprovedBody").setContent(a.RequestAutoApprovedBody)
    }, 1000);
    $("#EmailTemplatesForm").submit(function (c) {
        if ($("#EmailTemplatesForm").valid()) {
            c.preventDefault();
            var b = {};
            b.RequestSubmittedTitle = $("#txtRequestSubmittedTitle").val();
            b.RequestSubmittedCC = $("#txtRequestSubmittedCC").val();
            b.RequestSubmittedBody = tinyMCE.get("taRequestSubmittedBody").getContent();
            b.RequestRejectedTitle = $("#txtRequestRejectedTitle").val();
            b.RequestRejectedCC = $("#txtRequestRejectedCC").val();
            b.RequestRejectedBody = tinyMCE.get("taRequestRejectedBody").getContent();
            b.RequestApprovedTitle = $("#txtRequestApprovedTitle").val();
            b.RequestApprovedCC = $("#txtRequestApprovedCC").val();
            b.RequestApprovedBody = tinyMCE.get("taRequestApprovedBody").getContent();
            b.RequestAutoApprovedTitle = $("#txtRequestAutoApprovedTitle").val();
            b.RequestAutoApprovedCC = $("#txtRequestAutoApprovedCC").val();
            b.RequestAutoApprovedBody = tinyMCE.get("taRequestAutoApprovedBody").getContent();
            EmailTemplates.updateEmailTemplate(String(a.Id), b)
        }
    });
    jQuery("#EmailTemplatesForm").validate({
        ignore: ".ignore",
        rules: {
            txtRequestSubmittedTitle: {
                required: true,
                maxlength: 250
            },
            txtRequestApprovedTitle: {
                required: true,
                maxlength: 250
            },
            txtRequestRejectedTitle: {
                required: true,
                maxlength: 250
            },
            txtRequestSubmittedCC: {
                required: false,
                maxlength: 250,
                email: true
            },
            txtRequestApprovedCC: {
                required: false,
                maxlength: 250,
                email: true
            },
            txtRequestRejectedCC: {
                required: false,
                maxlength: 250,
                email: true
            }
        },
        invalidHandler: function (b, d) {
            var c = d.numberOfInvalids();
            if (c && (d.errorList[0].element.name == "txtRequestSubmittedTitle" || d.errorList[0].element.name == "txtRequestSubmittedCC")) {
                $("#formTabs").tabs("select", "#aRequestSubmitted")
            } else {
                if (c && (d.errorList[0].element.name == "txtRequestApprovedTitle" || d.errorList[0].element.name == "txtRequestApprovedCC")) {
                    $("#formTabs").tabs("select", "#aRequestApproved")
                } else {
                    if (c && (d.errorList[0].element.name == "txtRequestRejectedTitle" || d.errorList[0].element.name == "txtRequestRejectedCC")) {
                        $("#formTabs").tabs("select", "#aRequestRejected")
                    }
                }
            }
        },
        highlight: function (b) {
            jQuery(b).closest(".control-group").addClass("error")
        },
        success: function (b) {
            jQuery(b).closest(".control-group").removeClass("error")
        }
    })
});
