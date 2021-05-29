function addProduct(){

    var pId = document.getElementById("p_id").value;
    var pName = document.getElementById("pName").value;
    var pCharge = document.getElementById("pCharge").value;

    var dbref = firebase.database().ref().child('/Products/'+pId);

    dbref.set({
        pID: pId,
        charge: pCharge,
        productName: pName 
    });
    window.alert("Product added successfully!");
}


function showProduct(){

    var dbref = firebase.database().ref().child('/Products');
    var repeat = document.getElementById("showRow");
    var tab = document.getElementsByClassName("productsTable")[0];
    var totalProducts, i;

    // dbref.once("value").then(function(snapshot){
    //     totalProducts = snapshot.numChildren();
    //     i = totalProducts;
    // });
    var pid, pname, pcharge;
    var i=totalProducts;
    dbref.once("value")
        .then(function(snapshot){
            totalProducts = snapshot.numChildren();
            i = totalProducts;
            snapshot.forEach(function(childSnapshot){
                pid = childSnapshot.child('pID').val();
                pname = childSnapshot.child('productName').val();
                pcharge = childSnapshot.child('charge').val();
                document.getElementById("showRow").innerHTML = "<tr id=\"repeatRow\"><td id=\"spId\"></td><td id=\"spName\"></td><td id=\"spCharge\"></td></tr>";
                document.getElementById("spId").innerHTML = pid;
                document.getElementById("spName").innerHTML = pname;
                document.getElementById("spCharge").innerHTML = pcharge;
                if(--i){
                    console.log(i);
                    var clone = repeat.cloneNode(true);
                    tab.appendChild(clone);
                }
            });
        });
}