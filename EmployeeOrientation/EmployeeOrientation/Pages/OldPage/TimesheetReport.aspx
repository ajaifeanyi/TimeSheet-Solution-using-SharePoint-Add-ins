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

<link rel="stylesheet" href="../Content/bundle.css" type="text/css" />
    <link rel="stylesheet" href="../Content/styles.css" type="text/css" />

    <script src="../Scripts/jquery-1.10.2.js"></script>
    <script src="../Scripts/jquery-ui-1.9.2.min.js"></script>
    <script src="../Scripts/jtable/jquery.jtable.min.js"></script>

    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/bootstrap-timepicker.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.tagsinput.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.autogrow-textarea.js"></script>
    <script type="text/javascript" src="../Scripts/chosen.jquery.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="../Scripts/modernizr.min.js"></script>
    <script type="text/javascript" src="../Scripts/moment.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.loadTemplate-1.4.4.min.js"></script>
    <script type="text/javascript" src="../Scripts/notify.min.js"></script>
    <script type="text/javascript" src="../Scripts/underscore-min.js"></script>
    <script type="text/javascript" src="../Scripts/numeral.js"></script>

    <!--Custom script-->
    <script type="text/javascript" src="../Scripts/Custom/Common.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/TimesheetReport.js"></script>
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
    <div id="containerLeft" class="containerLeft" style="float:left;width:200px;margin-top:10px; "><div id="logoleft" class="mainLogo" style="background-image: url(../Images/logo.png) !important;"><a href="Default.aspx"> </a></div>
          
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
            <h1>Timesheet Report</h1>
        </div>

        <div id="mainContainer" style="clear: both;">

            <form id="filters" class="stdform stdform2"  method="post" style="width:450px;">

                
                 <p class="control-group">
                    <label >Period start between</label>
                    <span class="field" style="margin-left:160px;text-align:left;">
                        <input id="txtStartDate" type="text" class="input-small" style="font-size:12px;"   /> 
                        <input id="txtEndDate" type="text" class="input-small"  style="font-size:12px;" />
                    </span>
                </p>
                <p>
                    <label for="Requester Name">User Name </label>
                    <span class="field" style="margin-left:160px;text-align:left;">
                        <input type="text" id="txtRequesterName" class="input-large" style="width:195px;" />

                    </span>
                </p>
                <p>
                    <label >Status</label>
                    <span class="field" style="margin-left:160px;text-align:left;">
                        <select id="chblStatus" multiple="multiple" size="3" style="margin:1px;padding:0px;width:205px;font-size:12px;">
                                <option value="Draft">Draft</option>
                                <option value="Pending Approval">Pending approval</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Approved">Approved</option>
                            </select>

                    </span>
                </p>

                <p id="billableFilter" style="display:none;">
                    <label>Show billable only</label>
                    <span class="field"  style="margin-left:160px;text-align:left;">
                        <input style="line-height:20px !important;height:20px !important;" type="checkbox" name="chbBillable" id="chbBillable" /> 
                    </span>
                </p>  
                      
               
                <span style="margin-top:15px;display:block;">
                    <button id="btnRefresh" type="button" class="btn btn-primary">Refresh data</button>        
                </span>

            </form>
            

            <div style="width: 400px; margin-top: 25px">
                <div class="jtableContainer" id="Total"></div>
            </div>

            <div style="width: 400px; margin-top: 25px">
                <div class="jtableContainer" id="TotalByPeriod"></div>
            </div>

            <div style="width: 400px;  margin-top: 25px">
                <div class="jtableContainer" id="TotalByProject"></div>
            </div>

             <div style="width: 400px;  margin-top: 25px">
                <div class="jtableContainer" id="TotalByCategory"></div>
            </div>

            <div style="width: 400px; margin-top: 25px">
                <div class="jtableContainer" id="TotalByUser"></div>
            </div>

            <div style="width: 400px; height:50px; ">
            </div>
 
        </div>


    </div>
        
    </div>
      
  

</asp:Content>
