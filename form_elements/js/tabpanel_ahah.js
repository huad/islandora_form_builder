formbuilder = {
    tabpanel: {
        tabs: null, // Collection of all tabpanels.
        collapsibleTabs: null,
        nonCollapsibleTabs: null,
        loadPanels: function (collapse) {
            var load = '.action-load-tabpanel';
            var collapsible = '.property-collapsible-tabpanel';
            var collapsed = '.property-collapsed-tabpanel';
            this.tabs = $(load);
            this.collapsibleTabs = this.tabs.filter(collapsible);
            this.nonCollapsibleTabs = this.tabs.not(collapsible);
            var expandedTabs = this.collapsibleTabs.not(collapsed);
            var collapsedTabs = this.collapsibleTabs.filter(collapsed);
            collapsedTabs.tabs({
                collapsible: true,
                selected: collapse ? -1 : undefined,
                select: this.setCollapsibleIconOnSelect,
                create: this.setCollapsibleIconOnCreate
                });
            expandedTabs.tabs({
                collapsible: true,
                select: this.setCollapsibleIconOnSelect,
                create: this.setCollapsibleIconOnCreate
            });
            this.nonCollapsibleTabs.tabs({});
        },
        setCollapsibleIconOnSelect: function(event, ui) {
            var icon = $('span.expand-tabpanel-icon:first', this);
            if($(ui.panel).hasClass('ui-tabs-hide')) {
                icon.removeClass('ui-icon-circle-triangle-e');
                icon.addClass('ui-icon-circle-triangle-s');
            }
            else {
                icon.removeClass('ui-icon-circle-triangle-s');
                icon.addClass('ui-icon-circle-triangle-e');
            }
        },
        setCollapsibleIconOnCreate: function(event, ui) {
            var icon = $('span.expand-tabpanel-icon:first', this);
            if($('div.ui-tabs-panel:not(.ui-tabs-hide)', this).length > 0) {
                icon.removeClass('ui-icon-circle-triangle-e');
                icon.addClass('ui-icon-circle-triangle-s');
            }
            else {
                icon.removeClass('ui-icon-circle-triangle-s');
                icon.addClass('ui-icon-circle-triangle-e');
            }
        },
        enableActions: function () {
            $(".ui-icon-close").live("click", function() {
                var id = $(this).text();
                $("#"+id).trigger("mousedown");
            });
        },
        addTab: function(id) {
            $('#' + id).trigger("mousedown");
            return false;
        }
    } 
};

$(document).ready(function() {
    formbuilder.tabpanel.loadPanels(true);
    formbuilder.tabpanel.enableActions();
    $("body").ajaxComplete(function(event, request, settings) {
        formbuilder.tabpanel.loadPanels(false);
        var response = eval("(" + request.responseText + ")");
        jQuery.extend(Drupal.settings, response.settings);
        Drupal.attachBehaviors();
    });
});