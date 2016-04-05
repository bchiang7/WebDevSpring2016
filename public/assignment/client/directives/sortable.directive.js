(function() {
    angular
        .module("FieldsSortable", [])
        .directive("FieldsSortable", FieldsSortable);

    function FieldsSortable() {
        function link(scope, element, attrs) {
            var start = null;
            var end = null;
            $(element).sortable({
                axis: "y",
                placeholder: "highlight",
                sort: function(event, ui) {
                    //ui.helper.find("a").hide();
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    //ui.item.find("a").show();
                    end = ui.item.index();
                    if (start >= end) {
                        start--;
                    }
                    scope.model.sortPage(start, end);
                }
            });
        }
        return {
            scope: {
                FieldsSortableCallback: '&'
            },
            link: link
        };
    }

})();
