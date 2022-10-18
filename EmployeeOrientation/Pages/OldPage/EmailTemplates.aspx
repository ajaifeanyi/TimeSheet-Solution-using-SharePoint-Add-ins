<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
   
   <!-- <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />-->
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script> 
    <script type="text/javascript" src="/_layouts/15/sp.js"></script> 
    <meta name="WebPartPageExpansion" content="full" />


    <link rel="stylesheet" href="../Content/bundle_without_tables.css" type="text/css" />


    <link rel="stylesheet" href="../Content/styles.css" type="text/css" />

    <script src="../Scripts/jquery-1.10.2.js"></script>
    <script src="../Scripts/jquery-ui-1.9.2.min.js"></script>

    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/bootstrap-timepicker.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="../Scripts/modernizr.min.js"></script>
    <script type="text/javascript" src="../Scripts/elements.js"></script>
    <script type="text/javascript" src="../Scripts/prettify/prettify.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.loadTemplate-1.4.4.min.js"></script>
    <script type="text/javascript" src="../Scripts/notify.min.js"></script>


    <!--Custom script-->
     <script src="../Scripts/tinymce/jquery.tinymce.min.js"></script>
    <script src="../Scripts/tinymce/tinymce.min.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/Common.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/EmailTemplates.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<%-- %><asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Timesheet Plus
</asp:Content>--%>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

        <!-- The following content will be replaced with the user name when you run the app - see App.js -->

     <div class="containerWrapper">
      <!--Menu-->
    <div id="containerLeft" class="containerLeft" style="float:left;width:200px;margin-top:10px; "><a href="Default.aspx"><div id="logoleft" class="mainLogo" style="background-image: url(../Images/logo.png) !important;"> </div></a>
          
    <div id="menuleft" class="ui-sortable ui-resizable" style="float: left; line-height: normal;">
        <div class="navigation">
            <div class="navigation-title">
                <a class="toggle-navigation" href="#">
                    <span>My Timesheets</span>
                </a>
            </div>
            <ul class="navigation-menu">
                <li class="dropdown"></li>
                <li>
                    <a href="MyRequests.aspx?status=Draft">Drafts</a>
                </li>
                <li>
                    <a href="MyRequests.aspx?status=Pending Approval">Pending Approval</a>
                </li>
                <li>
                    <a href="MyRequests.aspx?status=Rejected">Rejected</a>
                </li>
                <li>
                    <a href="MyRequests.aspx?status=Approved">Approved</a>
                </li>
            </ul>
        </div>

   
        <div class="navigation" id="manageRequestsPanel" style="">
            <div class="navigation-title">
                <a class="toggle-navigation" href="#">
                    <span>Team Management</span>
                </a>
            </div>
            <ul class="navigation-menu">
                <li class="dropdown"></li>
                <li>
                    <a href="ToApproveByMe.aspx">Timesheets for My Approval</a>
                </li>
                <li>
                    <a href="ReportsRequests.aspx?mode=MyTeam">My Team's Timesheets</a>
                </li>

                <li>
                    <a href="TimesheetSummary.aspx">Timesheets Summary</a>
                </li>

                <li>
                    <a href="SubmissionsReport.aspx?mode=MyTeam">Submissions Report</a>
                </li>

                

                <li>
                    <a href="TimesheetReport.aspx?mode=MyTeam">Total Hours Report</a>
                </li>
                <li id="linkTotalCostsReport" style="display:none;">
                    <a href="TimesheetCostReport.aspx?mode=MyTeam">Total Cost Report</a>
                </li>

                <li>
                    <a href="SubstituteApproversList.aspx?My=true">My Substitute Approver</a>
                </li>
            </ul>
        </div>
        <div class="navigation" id="adminNavPanel" style="">
            <div class="navigation-title">
                <a class="toggle-navigation" href="#">
                    <span>Administration</span>
                </a>
            </div>
            <ul class="navigation-menu">
                <li class="dropdown"></li>
                <li>
                    <a href="Settings.aspx">Settings</a>
                </li>
                <li>
                    <a href="UserRolesList.aspx">User Roles</a>
                </li>
                <li>
                    <a href="UserProfilesList.aspx">User Profiles</a>
                </li>
                <li>
                    <a href="SubstituteApproversList.aspx">Substitute Approvers</a>
                </li>
                <li>
                    <a href="ProjectsList.aspx">Projects</a>
                </li>
                <li>
                    <a href="CategoriesList.aspx">Categories</a>
                </li>
                <li>
                    <a href="EmailTemplates.aspx">Email Templates</a>
                </li>
                <li>
                    <a href="ReportsRequests.aspx?mode=All">All Timesheets</a>
                </li>
                <li>
                    <a href="Integrations.aspx">Integrations</a>
                </li>
                <li>
                    <a href="Licenses.aspx">License</a>
                </li>
                <li>
                    <a href="Help.aspx">Help</a>
                </li>

            </ul>

        </div>

    </div>

 </div>


    <!--Main Content-->
    <div id="containerRight" class="containerRight">


        <div id="topHeader" class="topHeader">
            <a href="#" id="menuExpandButton" class="menuExpandButton" data-name="hide" ></a>
            <h1>Email Template</h1>
        </div>

        <div id="mainContainer" style="clear: both;">

            <div class="maincontent">



                    <form id="EmailTemplatesForm" class="stdform stdform2" method="post" action="EmailTemplates.aspx">





                        <div style="margin: 10px;">
                            <button id="btnSubmit" type="submit" class="btn btn-primary">Save</button>
                        </div>


                        <div class="tabbedwidget tab-primary" id="formTabs">
                            <ul id="tabs">
                                <li><a href="#aRequestSubmitted">Request Submitted</a></li>
                                <li><a href="#aRequestApproved">Request Approved</a></li>
                                <li><a href="#aRequestAutoApproved">Request Auto-approved</a></li>
                                <li><a href="#aRequestRejected">Request Rejected</a></li>
                            </ul>
                            <div id="aRequestSubmitted">

                                <p class="control-group">
                                    <label for="txtSubject">Subject</label>
                                    <span class="field">
                                        <input type="text" name="txtRequestSubmittedTitle" id="txtRequestSubmittedTitle" class="input-xlarge" style="width: 450px;" /></span>
                                </p>

                                <p class="control-group">
                                    <label>Email To</label>
                                    <span class="field">Request Approver(s) </span>
                                </p>

                                <p class="control-group">
                                    <label for="txtEmailCC">Email CC*</label>
                                    <span class="field">
                                        <input type="text" name="txtRequestSubmittedCC" id="txtRequestSubmittedCC" class="input-xlarge" style="width: 450px;" /></span>
                                </p>

                                <p class="control-group">
                                    <label for="txtEmailCC">Email body</label>
                                    <span class="field">
                                        <textarea id="taRequestSubmittedBody" cols="10" rows="10" style="width: 450px; height: 200px;"></textarea>
                                    </span>
                                </p>
                                <p class="control-group">
                                    <span style="font-size: 10px;">* - must be user registered in Sharepoint Site Collection as Regular User or Sharepoint External User.
                                    </span>
                                </p>


                            </div>


                            <div id="aRequestApproved">
                                <p class="control-group">
                                    <label for="txtSubject">Subject</label>
                                    <span class="field">
                                        <input type="text" name="txtRequestApprovedTitle" id="txtRequestApprovedTitle" class="input-xlarge" style="width: 450px;" /></span>
                                </p>

                                <p class="control-group">
                                    <label>Email To</label>
                                    <span class="field">Requester </span>
                                </p>

                                <p class="control-group">
                                    <label for="txtEmailCC">Email CC*</label>
                                    <span class="field">
                                        <input type="text" name="txtRequestApprovedCC" id="txtRequestApprovedCC" class="input-xlarge" style="width: 450px;" /></span>
                                </p>

                                <p class="control-group">
                                    <label for="txtEmailCC">Email body</label>
                                    <span class="field">
                                        <textarea id="taRequestApprovedBody" cols="10" rows="10" style="width: 450px; height: 200px;"></textarea>
                                    </span>
                                </p>

                                <p class="control-group">
                                    <span style="font-size: 10px;">* - must be user registered in Sharepoint Site Collection as Regular User or Sharepoint External User.
                                    </span>
                                </p>

                            </div>

                            <div id="aRequestAutoApproved">
                                <p class="control-group">
                                    <label for="txtSubject">Subject</label>
                                    <span class="field">
                                        <input type="text" name="txtRequestAutoApprovedTitle" id="txtRequestAutoApprovedTitle" class="input-xlarge" style="width: 450px;" /></span>
                                </p>

                                <p class="control-group">
                                    <label>Email To</label>
                                    <span class="field">Requester </span>
                                </p>

                                <p class="control-group">
                                    <label for="txtEmailCC">Email CC*</label>
                                    <span class="field">
                                        <input type="text" name="txtRequestAutoApprovedCC" id="txtRequestAutoApprovedCC" class="input-xlarge" style="width: 450px;" /></span>
                                </p>

                                <p class="control-group">
                                    <label for="txtEmailCC">Email body</label>
                                    <span class="field">
                                        <textarea id="taRequestAutoApprovedBody" cols="10" rows="10" style="width: 450px; height: 200px;"></textarea>
                                    </span>
                                </p>

                                <p class="control-group">
                                    <span style="font-size: 10px;">* - must be user registered in Sharepoint Site Collection as Regular User or Sharepoint External User.
                                    </span>
                                </p>

                            </div>

                            <div id="aRequestRejected">
                                <p class="control-group">
                                    <label for="txtSubject">Subject</label>
                                    <span class="field">
                                        <input type="text" name="txtRequestRejectedTitle" id="txtRequestRejectedTitle" class="input-xlarge" style="width: 450px;" /></span>
                                </p>

                                <p class="control-group">
                                    <label>Email To</label>
                                    <span class="field">Requester </span>
                                </p>

                                <p class="control-group">
                                    <label for="txtEmailCC">Email CC*</label>
                                    <span class="field">
                                        <input type="text" name="txtRequestRejectedCC" id="txtRequestRejectedCC" class="input-xlarge" style="width: 450px;" /></span>
                                </p>

                                <p class="control-group">
                                    <label for="txtEmailCC">Email body</label>
                                    <span class="field">
                                        <textarea id="taRequestRejectedBody" cols="10" rows="10" style="width: 450px; height: 200px;"></textarea>
                                    </span>
                                </p>

                                <p class="control-group">
                                    <span style="font-size: 10px;">* - must be user registered in Sharepoint Site Collection as Regular User or Sharepoint External User.
                                    </span>
                                </p>
                            </div>




                        </div>
                        <!--tabbedwidget-->
                    </form>


                </div>

        </div>


        </div>
        
    </div>
      
  

</asp:Content>
