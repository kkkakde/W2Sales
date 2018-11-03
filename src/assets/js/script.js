



// start reload page
$(document).ready(function(e) {
    var $input = $('#refresh');

    $input.val() == 'yes' ? location.reload(true) : $input.val('yes');

    
});
// end reload page

$(window).load(function() {
$(".se-pre-con").fadeOut("slow");
});

$(document).ready(function () {
$(".pageRowForm").css("display", "none");

$(".cancel-btn").click(function(){
	var abc = $(this).data('cancel');
	$("[data-parent="+abc+"]").hide();
	$('tr.pageRow[data-id='+abc+']').find('td:first-child').html('<i class="glyphicon glyphicon-plus glyphicon-pl-mi"></i>');
    //$('tr.pageRow[data-id='+abc+']').css('background-color','white');
    //$('tr.pageRow[data-id='+abc+']').css('color','#000');
});

          $(".pageRow").click(function(){
			  
			if(!$(this).hasClass('notExpanded'))
			{				
			  
			  
		  var abc = $(this).data('id');
		  if($("[data-parent="+abc+"]").css('display')=='none')
		  {
		  	   $('tr.pageRowForm[data-parent!='+abc+']').each(function(){
				    var abc1=$(this).data('parent');
					if($(this).css('display')!='none')
					{
						$(this).hide();
						//console.log($('tr.pageRow[data-id='+abc1+']').find('td:first-child'));
						$('div.pageRow[data-id='+abc1+']').find('div:first-child').html('<i class="glyphicon glyphicon-plus glyphicon-pl-mi"></i>'); // parent Add + button
						$('tr.pageRow[data-id='+abc1+']').find('td:first-child').html('<i class="glyphicon glyphicon-plus glyphicon-pl-mi"></i>');
                        //$('tr.pageRow[data-id='+abc1+']').css('background-color','white');
                        //$('tr.pageRow[data-id='+abc1+']').css('color','#000')	


					}
               });  	
			  
                $("[data-parent="+abc+"]").slideDown();		
                $('div.pageRow[data-id='+abc+']').html('<i class="glyphicon glyphicon-minus glyphicon-pl-mi"></i>'); // parent Add + button
                $('div:first-child', this).html('<i class="glyphicon glyphicon-minus  glyphicon-pl-mi-w"></i>');  // parent Add + button	   
			    $('td:first', this).html('<i class="glyphicon glyphicon-minus  glyphicon-pl-mi-w"></i>');
               // $(this).css('background-color','rgb(239, 239, 239)');
               // $(this).css('color','rgb(51, 122, 183)');				
		  }
		  else
		  {     
		 
		        $("[data-parent="+abc+"]").hide();
                  $('div.pageRow[data-id='+abc+']').html('<i class="glyphicon glyphicon-plus glyphicon-pl-mi"></i>'); // parent Add + button
		        $('div:first-child', this).html('<i class="glyphicon glyphicon-plus glyphicon-pl-mi"></i>');  // parent Add + button
			    $('td:first', this).html('<i class="glyphicon glyphicon-plus glyphicon-pl-mi"></i>');
               // $(this).css('background-color','white');
               // $(this).css('color','#000');				
		  }
			}
		    
        });
		});

function isNumberKey(evt) {
	        //alert("hi");
            var charCode = (evt.which) ? evt.which : event.keyCode;
            if (charCode != 46 && charCode > 31 &&
                (charCode < 48 || charCode > 57)) {
                alert("Please Enter Number");
                return false;
            }
			
            return true;
        }
		
		function isNumberKeyWithMark(evt,id,markid) {
	        //alert("hi");
            var charCode = (evt.which) ? evt.which : event.keyCode;
            if (charCode != 46 && charCode > 31 &&
                (charCode < 48 || charCode > 57)) {
               // alert("Please Enter Number");
                //return false;
            }
			else{
				if(charCode != 46 && charCode > 31 &&
                (charCode < 96 || charCode > 105)) {
                //alert("Please Enter Number2");
                //return false;
            }
			}
		
			var val=$('#'+id+'').val();
			//console.log(val);
			if(val.length >= 6)
			{
				$('#'+markid+'').show();
			}
			else{
				$('#'+markid+'').hide();
			}
		
            return true;
        }
		
		
    function phoneno(){          
            $('#mobile').keypress(function(e) {
                var a = [];
                var k = e.which;

                for (i = 48; i < 58; i++)
                    a.push(i);

                if (!(a.indexOf(k)>=0))
                    e.preventDefault();
            });
        }
        
         function validateEmail($email) {
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			return emailReg.test( $email );
}

function checkEmail(id,emailaddress) {

//var emailaddress = document.getElementByClass('txtEmail').value;
if( !validateEmail(emailaddress)) {

 /* do stuff here */
    alert('Please enter valid Email');
    $('#'+id+'').focus();
    return false;

}
}

/*** only allow number start***/
function isNumber(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    else if (charCode == 13 || charCode == 46)
        return false;
    else
        return true;
}

/* only allow number end*/




/** Allow number with two decimal point for amount validation**/ 
function AllowAmountWithDecimal(el, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = el.value.split('.');
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    //just one dot 
    if(number.length>1 && charCode == 46){
         return false;
    }
    //get the carat position
    var caratPos = getSelectionStart(el);
    var dotPos = el.value.indexOf(".");
    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
        return false;
    }
    return true;
}

function getSelectionStart(o) {
    if (o.createTextRange) {
        var r = document.selection.createRange().duplicate()
        r.moveEnd('character', o.value.length)
        if (r.text == '') return o.value.length
        return o.value.lastIndexOf(r.text)
    } else return o.selectionStart
}
/** End of AllowAmountWithDecimal function***/


function InvalidMsg(textbox,patternmsg,emptyMsg) {

     if(textbox.validity.patternMismatch){
        textbox.setCustomValidity(''+patternmsg+'');
     } else if(textbox.validity.valueMissing){
        textbox.setCustomValidity(''+emptyMsg+'');
    }
    else {
        textbox.setCustomValidity(''+emptyMsg+'');
     }
     return true;
}

function inavlidMsgKeyUp(textbox,e,emptyMsg) {
if(e.which==8){
	if(textbox.value.length==0){
    if(textbox.validity.patternMismatch){
        textbox.setCustomValidity(''+emptyMsg+'');
    } else if(textbox.validity.valueMissing){
        textbox.setCustomValidity(''+emptyMsg+'');
    }
    else {
        textbox.setCustomValidity(''+emptyMsg+'');
    }
    }
    return true;
}
}

// expand collapse plus - minus sign
$(document).on("click", "a.openclose", function () {
    //  $('a.openclose').click(function () {

    if ($(this).hasClass("collapsed")) {
        $(this).find('i').removeClass("fa-plus");
        $(this).find('i').addClass("fa-minus");

    }
    else {
        $(this).find('i').removeClass("fa-minus");
        $(this).find('i').addClass("fa-plus");
    }
});

// For Tooltip
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
});
//For TimePICKER
    function ConvertToDateandTime(date) {
        if (date != null && date != "null") {

            var arr = date.split("-");
            //   date = date.replace("-", " ");
            var currentTime = new Date(arr[1] + " " + arr[0] + " " + arr[2]);

            var month = currentTime.getMonth() + 1;
            switch (month.toString().length) {
                case 1:
                    month = "0" + month.toString();
                    break;
                default:

            }
            var day = currentTime.getDate();
            switch (day.toString().length) {
                case 1:
                    day = "0" + day.toString();
                    break;
                default:

            }
            var time = currentTime.getHours();
            switch (time.toString().length) {
                case 1:
                    time = "0" + time.toString();
                    break;
                default:

            }
            var min = currentTime.getMinutes();
            switch (min.toString().length) {
                case 1:
                    min = "0" + min.toString();
                    break;
                default:

            }
            var year = currentTime.getFullYear();
            //var data1 = year + "-" + month + "-" + day +"T"+ time + ":" + min +":00";
            var data1 = year + "-" + month + "-" + day + "T";
            return data1;
        }
        else {
            return "";
        }
    }



