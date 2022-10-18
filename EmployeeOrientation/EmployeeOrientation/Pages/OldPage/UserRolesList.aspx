<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../Content/bundle.css" rel="stylesheet" type="text/css"  />
   
     <link rel="stylesheet" href="../Content/bundle.css" type="text/css" />
      <link rel="stylesheet" href="../Content/styles.css" type="text/css" />

    <script type="text/javascript" src="../Scripts/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="../Scripts/jquery-ui-1.9.2.min.js"></script>


    <script type="text/javascript" src="../Scripts/jtable/jquery.jtable.min.js"></script>

    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/bootstrap-timepicker.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validate.min.js"></script>
     <script type="text/javascript" src="../Scripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="../Scripts/modernizr.min.js"></script>
    <script type="text/javascript" src="../Scripts/moment.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.loadTemplate-1.4.4.min.js"></script>
    

    <!--Custom script-->
    <script type="text/javascript" src="../Scripts/jquery.validationEngine.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validationEngine-en.js"></script>
    <link rel="stylesheet" href="../Content/validationEngine-jquery.css" type="text/css" />
    

    <script type="text/javascript" src="../Scripts/Custom/Common.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/UserRoles.js"></script>


     <%--  <link href="../Content/App.css" rel="stylesheet" />
    <script src="../Scripts/jquery-1.10.2.js"></script>
    <script src="../Scripts/jquery-ui-1.9.2.min.js"></script>
    <script src="../Scripts/jquery.jtable.min.js"></script>
    <script src="../Scripts/bootstrap.min.js"></script>
    <script src="../Scripts/jquery.cookie.js"></script>
    <script src="../Scripts/modernizr.min.js"></script>
    <script src="../Scripts/Moment.min.js"></script>
    <script src="../Scripts/jquery.loadTemplate-1.4.4.min.js"></script>
    <script src="../Scripts/Notify.min.js"></script>
    <script src="../Scripts/Numeral.js"></script>
    <script src="../Scripts/bootstrap-contextmenu.js"></script>
   <script src="../Scripts/Custom/Common.js"></script>
 <script src="../Scripts/Custom/AppInit.js"></script>--%>
    

  <%--  <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
   <!-- <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />-->
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script> 
    <script type="text/javascript" src="/_layouts/15/sp.js"></script> 
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link href="../Content/bundle.css" rel="stylesheet" />
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.jtable.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.loadTemplate-1.4.4.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery-ui-1.9.2.min.js"></script>--%>
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
    <div id="containerLeft" class="containerLeft" style="float:left;width:200px;margin-top:10px; ">
       <a href="Default.aspx"><div id="logoleft" class="mainLogo" style="background-image: url(../Images/logo.png) !important;"> </div></a>
      
        
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
       <div id="containerRight" class="containerRight">


        <div id="topHeader" class="topHeader">
            <a href="#" id="menuExpandButton" class="menuExpandButton" data-name="hide"><img src="../Images/menu-icon.png"></a>
            <h1>User Roles </h1>
        </div>

        <div id="mainContainer" style="clear:both;">
           


             <div style="width: 500px; margin-top: 15px">
                <div class="jtableContainer" id="UserRoles"><div class="jtable-main-container"><div class="jtable-busy-panel-background" style="display: none; width: 500px; height: 111px;"></div><div class="jtable-busy-message" style="display: none;"></div><div class="jtable-title"><div class="jtable-toolbar"><span class="jtable-toolbar-item" style=""></span></div></div><div class="jtable-column-resize-bar" style="display: none;"></div><div class="jtable-column-selection-container" style="left: 139px; top: 50px; min-width: 100px; display: none;"><ul class="jtable-column-select-list"><li><label for="Employee"><input type="checkbox" name="Employee" checked="checked"><span>User</span></label></li><li><label for="RoleName"><input type="checkbox" name="RoleName" checked="checked"><span>Role</span></label></li></ul></div></div></div>
            </div>

        </div>

    </div>
         </div>

    <!--Main Content-->
    
      
  

</asp:Content>
