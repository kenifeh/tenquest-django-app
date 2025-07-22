    var originCountrySelect = document.getElementById('originCountry');
    var destinationCountrySelect = document.getElementById('destinationCountry');
    var productTypesOption = document.getElementById('productTypeOption');
    var productWeightsOption = document.getElementById('productWeightOption');

    if(originCountrySelect != null || originCountrySelect != undefined){
    // Add an event listener to the originCountrySelect
    originCountrySelect.addEventListener('change', function() {
        // When the origin country changes, set the destination country to the opposite value
        destinationCountrySelect.value = (originCountrySelect.value === 'USA') ? 'Canada' : 'USA';
        if(originCountrySelect.value === 'USA'){
            productTypesOption.style.display = "block";
            productWeightsOption.style.display = "none";
        }else{
            productTypesOption.style.display = "none";
            productWeightsOption.style.display = "block";
        }
    });
    }

    document.addEventListener("DOMContentLoaded", function() {

    // Get references to the packageCategory and products select elements
    const packageCategorySelect = document.getElementById('packageCategory');
    const productsSelect = document.getElementById('products');
    setTimeout(() => {
        
        var targetAnchor = document.querySelector('a[href="https://elfsight.com/google-reviews-widget/?utm_source=websites&utm_medium=clients&utm_content=google-reviews&utm_term=localhost&utm_campaign=free-widget"]');
        if (targetAnchor) {
            targetAnchor.setAttribute("id","review-anchor")
        }
    }, 3000);

    // Your JSON data
    const packageTypes = {
        "Package Type": [
        {
            "Appliances": {
                "Product": [
                    "Kitchen appliances (blender, bread maker, coffee maker, food processor, toaster, kettle, slow cooker)",
                    "Large appliances (washer, dryer, refrigerator, dishwasher)",
                    "Vacuums"
                ]
            }
        },
        {
            "Apparel": {
                "Product": [
                    "Accessories (hats, sunglasses)",
                    "Boys' clothing (bottoms, shirts, tops, outerwear, sleepwear)",
                    "Girls' clothing (bottoms, shirts, tops, outerwear, sleepwear)",
                    "Gloves",
                    "Ladies' clothing (pants, tops, dresses, socks, underwear, sleepwear)",
                    "Luggage (backpacks, suitcases, carry-ons)",
                    "Mens' clothing (pants, jeans, shirts, t-shirts, briefs, socks, sleepwear)",
                    "Shoes (athletic, casual boots, sandals, slippers, skates)"
                ]
            }
        },
        {
            "Automotive": {
                "Product": [
                    "Automobile engines",
                    "Automotive parts",
                    "Brakes and brake linings",
                    "Tires",
                    "Wipers"
                ]
            }
        },
        {
            "Baby Items": {
                "Product": [
                        "Baby bottles, nipples, pacifiers",
                        "Baby cereal",
                        "Baby clothing (creeper set, tops, tunics, pants)",
                        "Baby monitors",
                        "Car seats",
                        "Carriage/Stroller",
                        "Crib",
                        "Diapers",
                        "Formula",
                        "High chairs"
                ]
            }
        },
        {
            "Electronics & Media": {
                "Product": [
                    "Batteries",
                    "Cameras",
                    "Computer software",
                    "Computers",
                    "DVD / Blu-ray players",
                    "Phones",
                    "Pre-recorded DVDs, CDs, VHS tapes",
                    "Printers",
                    "Tablets, e-readers",
                    "Televisions",
                    "Video console",
                    "Video games"
                ]
            }
        },
        {
            "Home Furnishings": {
                "Product": [
                    "Bathroom: Towels, shower curtains",
                    "Bedroom: Duvets, pillows, sheets, blankets",
                    "Furniture: Bedroom, home entertainment, living room, desk, dining room",
                    "Kitchen: Cookware, dishes, utensils"
                ]
            }
        },
        {
            "Food": {
                "Product": [
                    "Bread",
                    "Cereal",
                    "Dairy: Cheese, milk, ice cream, yogurt",
                    "Fruit",
                    "Meat: Beef",
                    "Meat: Pork",
                    "Meat: Poultry",
                    "Prepared meals",
                    "Vegetables"
                ]
            }
        },
        {
            "Health & Wellness": {
                "Product": [
                    "Beauty or makeup preparations",
                    "Shampoo",
                    "Soap",
                    "Vitamins"
                ]
            }
        },
        {
            "Jewellery": {
                "Product": [
                    "Costume jewellery",
                    "Precious and semi precious",
                    "Watches"
                ]
            }
        },
        {
            "Movies, Music, Books": {
                "Product": [
                    "Books",
                    "Movies, TV programs (DVDs)",
                    "Music (CDs)"
                ]
            }
        },
        {
            "Outdoor Living": {
                "Product": [
                    "BBQ",
                    "Garden handheld tools",
                    "Garden sheds & storage",
                    "Gazebos",
                    "Patio sets",
                    "Power tools"
                ]
            }
        },
        {
            "Sports": {
                "Product": [
                    "Bicycles",
                    "Camping (tents, sleeping bags)",
                    "Canoes",
                    "Exercise equipment (treadmills, exercise bikes, home gym)",
                    "Golf clubs",
                    "Hockey stick",
                    "Personal watercraft (jet ski)",
                    "Safety helmets, pumps, seat pad"
                ]
            }
        },
        {
            "Toys": {
                "Product": [
                    "Action figures, animals & stuffed toys, dolls",
                    "Board games, puzzles",
                    "Vehicle play sets",
                    "Wheeled toys (tricycles & pedal cars)"
                ]
            }
        }
    ]
    };

    // Populate the packageCategory select with options
    for (const category of packageTypes["Package Type"]) {
     const option = document.createElement("option");
        option.value = Object.keys(category);
        option.textContent = Object.keys(category);
        packageCategorySelect.appendChild(option);
    }

    // Add an event listener to the packageCategory select
    packageCategorySelect.addEventListener('change', function() {
        // Clear the existing options in the products select
        while (productsSelect.options.length > 0) {
            productsSelect.remove(0);
        }

        // Get the selected package category
        var selectedCategory = packageCategorySelect.value;

        // Populate the products select with options based on the selected category
        if (selectedCategory) {
        for(let i in packageTypes["Package Type"]){
            if(packageTypes["Package Type"][i].hasOwnProperty(selectedCategory)){
               selectedCategory = packageTypes["Package Type"][i][selectedCategory];
                break;
            }
        }
            const products = selectedCategory["Product"];
            for (const product of products) {
                const option = document.createElement("option");
                option.value = product;
                option.textContent = product;
                productsSelect.appendChild(option);
            }
        } else {
            const option = document.createElement("option");
            option.value = "";
            option.textContent = "Select a package category first";
            productsSelect.appendChild(option);
        }
    });
});

function rate(){

    var ratesContainer = document.getElementById("rates");
    var originCountry = document.getElementById("originCountry").value;
    var packageCategory = document.getElementById("packageCategory").value;
    var products = document.getElementById("products").value;
    var quantity = document.getElementById("quantity").value;
    var productType = document.getElementById("productType").value;
    var location = document.getElementById("location").value;
    var productWeight = document.getElementById("productWeight").value;

    if(packageCategory == "" || products == "" || quantity == "" || (productType == "" && productWeight == "") || location == ""){
        alert("Please fill all the fields");
        return;
    }else{
        ratesContainer.style.display = "flex";
    }

    var Tax  = document.getElementById("taxLineValue");
    var Duty  = document.getElementById("dutyLineValue");
    var totalPrice = document.getElementById("totalPriceLineValue");

    var taxValue = parseFloat(taxValue);
    var dutyValue = parseFloat(dutyValue);
    var totalValue = parseFloat(totalPrice.textContent);

    var price = 0;

    if(originCountry == "USA"){
            if (productType == "consolidate") {
                price = 3.99;
            } else {
                price = 5.99;
            }
    }else{
        if (productWeight === "0lbs to 9.99lbs" || parseFloat(productWeight) <= 9.99) {
                price = 1.99;
            } else if (productWeight === "10lbs to 19.99lbs" || parseFloat(productWeight) >= 10.00 && parseFloat(productWeight) <= 19.99) {
                price = 3.99;
            } else if (productWeight === "20lbs to 29.99lbs" || parseFloat(productWeight) >= 20.00 && parseFloat(productWeight) <= 29.99) {
                price = 5.99;
            } else if (productWeight === "30lbs to 39.99lbs" || parseFloat(productWeight) >= 30.00 && parseFloat(productWeight) <= 39.99) {
                price = 7.99;
            } else if (productWeight === "Over 40lbs" || parseFloat(productWeight) >= 40.00) {
                price = 10.99;
            }
    }
    price = price * quantity;

    switch(packageCategory){
        case "Appliances":
                    switch(products) {
                        case "Kitchen appliances (blender, bread maker, coffee maker, food processor, toaster, kettle, slow cooker)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`;
                                        Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                        totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`;
                                        Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                        totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`;
                                        Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                        totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue = 0;
                                        dutyValue = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`;
                                        Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                        totalPrice.textContent  = `$${price.toFixed(2)}`;

                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.09;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`;
                                        Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                        totalPrice.textContent  = `$${price.toFixed(2)}`;

                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.09;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`;
                                        Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                         totalPrice.textContent  = `$${price.toFixed(2)}`;

                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Large appliances (washer, dryer, refrigerator, dishwasher)":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`;
                                            Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                            totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`;
                                            Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                            totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.08;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.08;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Vacuums":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.08;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.08;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        default:
                            break;
                    }
                    break;
                case "Apparel":
                    switch(products) {
                        case "Accessories (hats, sunglasses)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.16;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.16;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Boys' clothing (bottoms, shirts, tops, outerwear, sleepwear)":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Girls' clothing (bottoms, shirts, tops, outerwear, sleepwear)":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Gloves":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        taxValue  = price * 0.13;
                                        taxValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Ladies' clothing (pants, tops, dresses, socks, underwear, sleepwear)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Luggage (backpacks, suitcases, carry-ons)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.11;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.11;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Mens' clothing (pants, jeans, shirts, t-shirts, briefs, socks, sleepwear)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Shoes (athletic, casual boots, sandals, slippers, skates)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.20;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.20;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Automotive":
                    switch(products) {
                        case "Automobile engines":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 20) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 21 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Automotive parts":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.085;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.085;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Brakes and brake linings":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.10;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.10;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Tires":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.07;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.07;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Wipers":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;

                    }
                    break;
                case "Baby Items":
                    switch(products) {
                        case "Baby bottles, nipples, pacifiers":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.065;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.065;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Baby cereal":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.095;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.095;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Baby clothing (creeper set, tops, tunics, pants)":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Baby monitors":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Car seats":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.06;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.06;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Carriage/Stroller":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.08;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.08;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Crib":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Diapers":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Formula":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "High chairs":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Electronics & Media":
                    switch(products) {
                        case "Batteries":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.07;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.07;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Cameras":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.05;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.05;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Computer software":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Computers":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "DVD / Blu-ray players":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Phones":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Pre-recorded DVDs, CDs, VHS tapes":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 20) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Printers":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Tablets, e-readers":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Televisions":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.05;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.05;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Video console":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Video games":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Home Furnishings":
                    switch(products) {
                        case "Bathroom: Towels, shower curtains":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Bedroom: Duvets, pillows, sheets, blankets":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Furniture: Bedroom, home entertainment, living room, desk, dining room":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.095;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.095;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Kitchen: Cookware, dishes, utensils":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.07;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.07;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Food":
                    switch(products) {
                        case "Bread":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;

                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.085;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.085;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Cereal":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.04;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.04;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Dairy: Cheese, milk, ice cream, yogurt":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 3.135;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 3.135;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Fruit":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.125;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.125;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Meat: Beef":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.265;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.265;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Meat: Pork":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Meat: Poultry":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 20) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 21 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Prepared meals":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 20) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 21 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Vegetables":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.105;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.105;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Health & Wellness":
                    switch(products) {
                        case "Beauty or makeup preparations":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.065;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.065;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Shampoo":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.065;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.065;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Soap":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.065;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.065;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Vitamins":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.105;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.105;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Jewellery":
                    switch(products) {
                        case "Costume jewellery":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                       Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.085;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.085;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Precious and semi precious":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.085;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.085;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Watches":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.05;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.05;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        default:
                            break;
                    }
                    break;
                case "Movies, Music, Books":
                    switch(products) {
                        case "Books":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Movies, TV programs (DVDs)":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Music (CDs)":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        default:
                            break;
                    }
                    break;
                case "Outdoor Living":
                    switch(products) {
                        case "BBQ":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.08;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.08;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Garden handheld tools":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.11;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.11;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Garden sheds & storage":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.065;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.065;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Gazebos":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 20) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.065;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                       Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.065;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Patio sets":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Power tools":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Sports":
                    switch(products) {
                        case "Bicycles":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.13;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.13;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Camping (tents, sleeping bags)":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Canoes":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.095;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.095;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Exercise equipment (treadmills, exercise bikes, home gym)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Golf clubs":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Hockey stick":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Personal watercraft (jet ski)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Safety helmets, pumps, seat pad":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Toys":
                    switch(products) {
                        case "Action figures, animals & stuffed toys, dolls":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Board games, puzzles":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Vehicle play sets":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = price + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Wheeled toys (tricycles & pedal cars)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.08;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.08;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
    }
}

function rate2(){
        var price = parseFloat(document.getElementById("product_price").value);
        if(isNaN(price)) {
            alert("Please enter the price in number");
            return false;
        }
        else if(price < 0 || price > 3300) {
            alert("Please enter the price between $0 to $3300");
            return false;
        }
        var packageCategory = document.getElementById("packageCategory").value;
        var products = document.getElementById("products").value;
        var Tax = document.getElementById("tax");
        var Duty = document.getElementById("duty");
        var totalPrice = document.getElementById("totalPrice");
        var taxValue = 0;
        var dutyValue = 0;
        var total_proprice = 0;
        Tax.textContent = parseFloat(taxValue);
        Duty.textContent = parseFloat(dutyValue);
        totalPrice.textContent = parseFloat(total_proprice);
        var location = document.getElementById("origin").value;     
        switch(packageCategory){
        case "Appliances":
                    switch(products) {
                        case "Kitchen appliances (blender, bread maker, coffee maker, food processor, toaster, kettle, slow cooker)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`;
                                        Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                        totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`;
                                        Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                        totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`;
                                        Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                        totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue = 0;
                                        dutyValue = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`;
                                        Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                        totalPrice.textContent  = `$${price.toFixed(2)}`;

                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.09;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`;
                                        Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                        totalPrice.textContent  = `$${price.toFixed(2)}`;

                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.09;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = price + taxValue;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`;
                                        Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                         totalPrice.textContent  = `$${price.toFixed(2)}`;

                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Large appliances (washer, dryer, refrigerator, dishwasher)":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`;
                                            Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                            totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`;
                                            Duty.textContent = `$${dutyValue.toFixed(2)}`;
                                            totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.08;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.08;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Vacuums":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.08;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.08;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        default:
                            break;
                    }
                    break;
                case "Apparel":
                    switch(products) {
                        case "Accessories (hats, sunglasses)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.16;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.16;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Boys' clothing (bottoms, shirts, tops, outerwear, sleepwear)":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Girls' clothing (bottoms, shirts, tops, outerwear, sleepwear)":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Gloves":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        taxValue  = price * 0.13;
                                        taxValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Ladies' clothing (pants, tops, dresses, socks, underwear, sleepwear)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Luggage (backpacks, suitcases, carry-ons)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.11;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.11;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Mens' clothing (pants, jeans, shirts, t-shirts, briefs, socks, sleepwear)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Shoes (athletic, casual boots, sandals, slippers, skates)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;

                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.20;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.20;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Automotive":
                    switch(products) {
                        case "Automobile engines":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 20) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 21 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Automotive parts":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.085;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.085;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Brakes and brake linings":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.10;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.10;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Tires":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.07;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.07;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Wipers":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;

                    }
                    break;
                case "Baby Items":
                    switch(products) {
                        case "Baby bottles, nipples, pacifiers":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.065;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.065;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Baby cereal":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.095;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.095;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Baby clothing (creeper set, tops, tunics, pants)":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Baby monitors":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Car seats":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.06;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.06;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Carriage/Stroller":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.08;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.08;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Crib":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Diapers":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Formula":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "High chairs":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Electronics & Media":
                    switch(products) {
                        case "Batteries":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.07;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.07;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Cameras":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.05;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.05;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Computer software":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Computers":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "DVD / Blu-ray players":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Phones":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Pre-recorded DVDs, CDs, VHS tapes":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 20) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Printers":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Tablets, e-readers":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Televisions":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.05;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.05;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Video console":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Video games":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Home Furnishings":
                    switch(products) {
                        case "Bathroom: Towels, shower curtains":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.18;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Bedroom: Duvets, pillows, sheets, blankets":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Furniture: Bedroom, home entertainment, living room, desk, dining room":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.095;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.095;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Kitchen: Cookware, dishes, utensils":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.07;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.07;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Food":
                    switch(products) {
                        case "Bread":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;

                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.085;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.085;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Cereal":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.04;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.04;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Dairy: Cheese, milk, ice cream, yogurt":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 3.135;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 3.135;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Fruit":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.125;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.125;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Meat: Beef":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.265;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.265;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Meat: Pork":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Meat: Poultry":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 20) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 21 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Prepared meals":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Vegetables":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.105;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.105;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Health & Wellness":
                    switch(products) {
                        case "Beauty or makeup preparations":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.065;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.065;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Shampoo":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.065;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.065;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Soap":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.065;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.065;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Vitamins":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.105;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.105;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Jewellery":
                    switch(products) {
                        case "Costume jewellery":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                       Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.085;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.085;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Precious and semi precious":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.085;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.085;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Watches":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.05;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.05;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        default:
                            break;
                    }
                    break;
                case "Movies, Music, Books":
                    switch(products) {
                        case "Books":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Movies, TV programs (DVDs)":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Music (CDs)":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        default:
                            break;
                    }
                    break;
                case "Outdoor Living":
                    switch(products) {
                        case "BBQ":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.08;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.08;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Garden handheld tools":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.11;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.11;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Garden sheds & storage":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.065;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.065;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Gazebos":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 20) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.065;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                       Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.065;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Patio sets":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Power tools":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Sports":
                    switch(products) {
                        case "Bicycles":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.13;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.13;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Camping (tents, sleeping bags)":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.18;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Canoes":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = price * 0.095;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = price * 0.095;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Exercise equipment (treadmills, exercise bikes, home gym)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Golf clubs":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Hockey stick":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Personal watercraft (jet ski)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.095;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Safety helmets, pumps, seat pad":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "Toys":
                    switch(products) {
                        case "Action figures, animals & stuffed toys, dolls":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) { // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = 0;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Board games, puzzles":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            break;
                        case "Vehicle play sets":
                                switch(location) {
                                    case "Canada":
                                        // 3rd condtion of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                            dutyValue  = 0;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    case "Elsewhere":
                                        // 2nd condition of Rule of Reference
                                        if(price >= 0 && price <= 40) {
                                            taxValue  = 0;
                                            dutyValue  = 0;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 41 && price <= 150) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        else if(price >= 151 && price <= 3300) {
                                            dutyValue  = 0;
                                            price = price + dutyValue ;
                                            taxValue  = price * 0.13;
                                            price = dutyValue + taxValue ;
                                            Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        case "Wheeled toys (tricycles & pedal cars)":
                            switch(location) {
                                case "Canada":
                                    // 3rd condtion of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {  // 4th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {  // 5th condition of Rule of Reference
                                        dutyValue  = 0;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                case "Elsewhere":
                                    // 2nd condition of Rule of Reference
                                    if(price >= 0 && price <= 40) {
                                        taxValue  = 0;
                                        dutyValue  = 0;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 41 && price <= 150) {
                                        dutyValue  = price * 0.08;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    else if(price >= 151 && price <= 3300) {
                                        dutyValue  = price * 0.08;
                                        price = price + dutyValue ;
                                        taxValue  = price * 0.13;
                                        price = dutyValue + taxValue ;
                                        Tax.textContent = `$${taxValue.toFixed(2)}`; Duty.textContent = `$${dutyValue.toFixed(2)}`; totalPrice.textContent  = `$${price.toFixed(2)}`;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
}

        Tax.textContent = `$${taxValue.toFixed(2)}`;
        Duty.textContent = `$${dutyValue.toFixed(2)}`;
        totalPrice.textContent = `$${price.toFixed(2)}`;

        var dutyPercent = document.getElementById("dutyPercent");
        var taxPercent = document.getElementById("taxPercent");
        var actualprice = parseFloat(document.getElementById("product_price").value);

        // Convert strings to numbers before performing operations
        var dutyValueNumber = parseFloat(Duty.textContent.replace('$', ''));
        var totalPriceNumber = parseFloat(totalPrice.textContent.replace('$', ''));

        dutyPercent.textContent = ((dutyValueNumber / actualprice) * 100).toFixed(2) + '%';
        taxPercent.textContent = ((taxValue / actualprice) * 100).toFixed(2) + '%';


        Tax.style.fontWeight = "bold";
        Duty.style.fontWeight = "bold";
        totalPrice.style.fontWeight = "bold";

        dutyPercent.style.fontWeight = "bold";
        taxPercent.style.fontWeight = "bold";
}

function reset(){
    document.getElementById("product_price").value = "0.00";
    document.getElementById("packageCategory").value = "";
    document.getElementById("products").value = "";
    document.getElementById("origin").value = "";
    document.getElementById("tax").textContent = "$0.00";
    document.getElementById("duty").textContent = "$0.00";
    document.getElementById("totalPrice").textContent = "$0.00";
    document.getElementById("province").value = "";
    document.getElementById("dutyPercent").textContent = "0.00%";
    document.getElementById("taxPercent").textContent = "0.00%";
}