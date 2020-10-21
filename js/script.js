$(document).ready(function() {


	$( "a" ).click(function( event ) {
  		event.preventDefault();
	});

	var numOfOrders = 0;
	$(".num").text(numOfOrders);

	$("#thanksMessage, #checkOrderPizza, #finishOrderDialog").hide();



	$("#addToCartPizza").on("click", function () {
		$("#checkOrderPizza").dialog({
				hide: "blind",
            	show : "blind",
            	width: "400px",
              closeText: "X"});
	})


function size(x) {
  $("#size"+x).children("li").children("input").each(function () {
    if($(this).is(":checked")){
    addedValue = parseInt($(this).attr('value'), 10);
    priceDialog += addedValue;
      $("#totalDialog"+x+">span").text(priceDialog);
  }

});

};
	function checkboxChange(x) {
		var priceDialog = 0;

      $("#recipe2"+x).children("li").children("input").each(function () {
        if($(this).is(":checked")){
        addedValue = parseInt($(this).attr('value'), 10);
        priceDialog += addedValue;
      }
    });

		$("#recipe"+x).children("li").children("input").each(function () {
			if($(this).is(":checked")){
				addedValue = parseInt($(this).attr('value'), 10);
        priceDialog += addedValue;
			}

				$("#totalDialog"+x+">span").text(priceDialog);
			$(this).change(function () {
				if ($(this).is(":checked")) {
				addedValue = parseInt($(this).attr('value'), 10);
        priceDialog += addedValue;
					console.log(priceDialog);
					$("#totalDialog"+x+">span").text(priceDialog);
				}else{
					addedValue = parseInt($(this).attr('value'), 10);
          priceDialog -= addedValue;
					$("#totalDialog"+x+">span").text(priceDialog);
				}
			})

		});
	}

	$(".listOver").on("click", function () {
		var orderName = '<h3 class="orderName"><span>' + $(this).parent().siblings(".ui-dialog-titlebar").children("span").text() + '</span><a class="delBtn">&#10008;</a>' +'</h3>';
		var orderIngredients = '<ul class="orderIngredients"></ul>';
		var orderPrice = '<h3 class="orderPrice"><span>' + $(this).parent().children(".totalDialog").children("span").text() + '</span>$<h3>'
		var horisontalLine = '<hr>';
		$(".cart").children("#listOfOrders").append("<li>" + orderName + orderIngredients + orderPrice + horisontalLine + "</li>");

		$(this).parent().children("ul").children().children("input:checked").each(function () {
			var selectedIngredient = $(this).parent().text();
			$(".orderIngredients").last().append("<li>" + selectedIngredient + "</li>");
		})


		$(this).parent(".ui-dialog-content").dialog("close");

		numOfOrders = $("#listOfOrders").children().length;
		$(".num").text(numOfOrders);

		var totalOrderPrice = 0;
		$("#listOfOrders").children("li").children(".orderPrice").children("span").each(function () {
			var price = parseFloat($(this).text());
			totalOrderPrice += price;
			$(".cart > h3 > span").text(totalOrderPrice + "Ksh");
		});

		$(".delBtn").on("click", function () {
			var removePrice = $(this).parent().parent().children(".orderPrice").children("span").text();
			totalOrderPrice -= removePrice;
			$(".cart > h3 > span").text(totalOrderPrice + "Ksh");

			$(this).parents("li").remove();
			numOfOrders = $("#listOfOrders").children().length;
			$(".num").text(numOfOrders);
		})
	}); 

	$(".finishOrder").on("click", function () {
     $("#finalOrderList > ol").children().remove();
		$(".orderName").children("span").each(function(){
			var finalOrder = '<li>' + $(this).text() + '</li>';
			$("#finalOrderList > ol").append(finalOrder);
		})

		$("#finishOrderDialog").dialog({
			hide: "blind",
	    	show : "blind",
	    	width: "500px",

	    });
	})

	$(".order").on("click", function () {
		var name = $("#buyerName").val();
		var number = $("#buyerNumber").val();
		var address = $("#buyerAddress").val();

		if (name != "" && number != "" && address != "") {
      $("#guests").html(address);
			$("#finishOrderDialog").dialog("close");
			$("#buyerInfo").children("p").remove();
			$("#thanksMessage").dialog({
				hide: "blind",
		    	show : "blind",
		    	width: "400px"
		    });
		    setTimeout(function(){
		    	$("#thanksMessage").dialog("close");

		    }, 6000);
		}else{
			$("#buyerInfo").append('<p>Fill up all the inputs</p>');
		}
	})
});
