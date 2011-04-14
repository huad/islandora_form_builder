formbuilder = {
    tabpanel: {
        tabs: null, // Collection of all tabpanels.
        collapsibleTabs: null,
        nonCollapsibleTabs: null,
        loadPanels: function () {
            var load = '.action-load-tabpanel';
            var collapsible = '.property-collapsible-tabpanel';
            var collapsed = '.property-collapsed-tabpanel';
            this.tabs = $(load);
            this.collapsibleTabs = this.tabs.filter(collapsible);
            this.nonCollapsibleTabs = this.tabs.not(collapsible);
            var expandedTabs = this.collapsibleTabs.not(collapsed);
            var collapsedTabs = this.collapsibleTabs.filter(collapsed);
            collapsedTabs.tabs( { selected: -1 });
            expandedTabs.tabs( { collapsible: true });
            this.nonCollapsibleTabs.tabs({});
        },
        enableActions: function () {
            $(".ui-icon-circle-triangle-e").live("click", function() {
                var tabPanel = $(this).parents('div.ui-tabs:first');
                $(this).removeClass('ui-icon-circle-triangle-e');
                $(this).addClass('ui-icon-circle-triangle-s');
                $("div.ui-tabs-panel", tabPanel).addClass("ui-tabs-hide");
            });
            $(".ui-icon-circle-triangle-s").live("click", function() {
                var links = $(this).parents('ul:first');
                var activeTab = $('li.ui-state-active:first', links).get(0);
                var index = $('li', links).index(activeTab);
                var tabPanel = $(this).parents('div.ui-tabs:first');
                $('div.ui-tabs-panel:eq('+index+')', tabPanel).removeClass('ui-tabs-hide');
                $(this).removeClass('ui-icon-circle-triangle-s');
                $(this).addClass('ui-icon-circle-triangle-e');
            });
            $(".ui-icon-close").live("click", function() {
                var id = $(this).text();
                $("#"+id).trigger("mousedown");
            });
            // TODO find Add button and Remove Button...
        }
    } 
};

$(document).ready(function() {
    formbuilder.tabpanel.loadPanels();
    formbuilder.tabpanel.enableActions();
    $("body").ajaxComplete(function(event, request, settings) {
        formbuilder.tabpanel.loadPanels();
        var response = eval("(" + request.responseText + ")");
        jQuery.extend(Drupal.settings, response.settings);
        Drupal.attachBehaviors();
    });
});