var dbref = firebase.database().ref().child('/Products');
    var repeat = document.getElementById("showRow");
    var tab = document.getElementsByClassName("productsTable")[0];
    
    var totalProducts, i;
    var pIdArr = [];
    var pNameArr = [];
    var pChargeArr = [];
    var del = "<button class=\"btn btn-danger\" onclick=\"deleteProduct(";
    var closedel = ")\">Delete</button>";
    var edit = "<a href=\"#\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#editProduct\" data-whatever=\"editProduct(";
    var closeEdit = ")\">Edit</a>";
    var variableD, variableE;
    var arrDet = [];
    var changedID, changedName, changedCharge;

    // dbref.once("value").then(function(snapshot){
    //     totalProducts = snapshot.numChildren();
    //     i = totalProducts;
    // });
    var pid, pname, pcharge;
    var j, list;
    dbref.once("value")
        .then(function(snapshot){
            totalProducts = snapshot.numChildren();
            //window.alert(totalProducts);
            i = totalProducts-1;
            snapshot.forEach(function(childSnapshot){
                pid = childSnapshot.child('pID').val();
                pname = childSnapshot.child('productName').val();
                pcharge = childSnapshot.child('charge').val();
        
                j=totalProducts-i;

                if(pid!="IDOfProduct"){
                    list = {
                        ID: pid,
                        indexN: j
                    };
                    pIdArr.push(pid);
                    pNameArr.push(pname);
                    pChargeArr.push(pcharge);
                    arrDet.push(list);
                    variableD = del+j+closedel;
                    variableE = edit+j+closeEdit;
                    //console.log(variable);
                    document.getElementById("showRow").innerHTML = "<div class=\"card\"><div class=\"card-block\"><p class=\"card-title text-dark\" id=\"spName\"></p><span class=\"card-text text-dark text-sm\">&#8377&ensp;</span><span class=\"card-text text-dark text-sm\" id=\"spCharge\"></span><span id=\"editbtn\"></span><span id=\"dltbtn\"></span></div></div>";
                    // document.getElementById("spId").innerHTML = pid;

                    document.getElementById("spName").innerHTML = pname;
                    document.getElementById("spCharge").innerHTML = pcharge;
                    document.getElementById("editbtn").innerHTML = variableE;
                    document.getElementById("dltbtn").innerHTML = variableD;

                    if(--i){
                        //console.log(i);
                        var clone = repeat.cloneNode(true);
                        tab.appendChild(clone);
                    }
                }
            });
            
        });

function addProduct(){
    var pId = document.getElementById("p_id").value;
    var pName = document.getElementById("pName").value;
    var pCharge = document.getElementById("pCharge").value;
        
    var dbreference = firebase.database().ref().child('/Products/'+pId);
 
    dbreference.set({
        pID: pId,
        charge: pCharge,
        productName: pName 
    });
    window.alert("Product added successfully!");
}

function deleteProduct(indexP){
    var k;
    
    for(k=0; k<totalProducts-1; k++){
        
        if(arrDet[k].indexN === indexP){

            dbref.child(arrDet[k].ID).remove();
            window.alert("Product deleted successfully!!");
            location.reload();
        
        }
    }
}

function editProduct(indexP){
    var k;
    
    for(k=0; k<totalProducts-1; k++){
        
        if(arrDet[k].indexN === indexP){

            changedID = document.getElementById("pIdP").value;
            //window.alert(changedID);
            changedName = document.getElementById("nameP").value;
            //window.alert(changedName);
            changedCharge = document.getElementById("chargeP").value;
            
            dbref.child(arrDet[k].ID).remove();
            arrDet[k].ID = changedID;
            dbref.child(arrDet[k].ID).set({
                pID: changedID,
                productName: changedName,
                charge: changedCharge
            });
            // dbref.child(arrDet[k].ID).set(changedID);
            window.alert("Product edited successfully!!");
            location.reload;

        }
    }
}

$('#editProduct').on('show.bs.modal', function(event){
    var button = $(event.relatedTarget)
    var recipient = button.data('whatever')
    var modal = $(this);
    var y = parseInt(recipient.charAt(12)), x;

    for(x=0; x<totalProducts-1; x++){
        if(arrDet[x].indexN === y){
            modal.find('.modal-footer #proName').attr('onclick', recipient);
            modal.find('.modal-body #nameP').attr('value', pNameArr[x]);
            modal.find('.modal-body #chargeP').attr('value', pChargeArr[x]);
            modal.find('.modal-body #pIdP').attr('value', pIdArr[x]);
        }
    }

})