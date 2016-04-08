(function() {
    angular
        .module("sortableDirective", [])
        .directive("fieldsSortable", FieldsSortable);

    function FieldsSortable() {

        function link(scope, element, attrs) {
            var start = null;
            var end = null;
            $(element)
                .sortable({
                    axis: "y",
                    handle: ".handle",
                    placeholder: 'field-sortable-placeholder',
                    helper: fixedWidthHelper,
                    start: function(event, ui) {
                        //ui.helper.find("a").hide();
                        start = ui.item.index();
                    },
                    stop: function(event, ui) {
                        //ui.item.find("a").show();
                        end = ui.item.index();
                        if (start >= end) {
                            start--;
                        }
                        scope.fieldsSortableCallback({
                            start: start,
                            end: end
                        });
                    }
                });
        }
        return {
            scope: {
                fieldsSortableCallback: '&'
            },
            link: link
        };


        function fixedWidthHelper(e, tr) {
            var $originals = tr.children();
            var $helper = tr.clone();
            $helper.children().each(function(index) {
                $(this).width($originals.eq(index).width())
            });
            return $helper;
        };
    }

})();
