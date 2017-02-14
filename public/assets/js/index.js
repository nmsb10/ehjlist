//REMEMBER: CODE EVERYTHING ONLY ONCE
//Do not Repeat Yourself = DRY
document.addEventListener("DOMContentLoaded", function(event) {
	// document.querySelector("body").style.backgroundImage = "url(./assets/img/" + backgroundImages[Math.floor(Math.random()*backgroundImages.length)]+ ")";
	// spinIcon('search-icon');
	if(document.getElementById('deal-container-ind')){
		populateIndBusDeals(3);
	}
});

function spinIcon(icon){
	document.getElementById(icon).parentNode.addEventListener('mouseenter', function(event){
		document.getElementById(icon).classList.add('fa-spin');
	});
	document.getElementById(icon).parentNode.addEventListener('mouseleave', function(event){
		document.getElementById(icon).classList.remove('fa-spin');
	});
}

//function to add howMany (randomly fabricated) deals to the individual business page deals section
function populateIndBusDeals(howMany){
	var imagesArray = dealImages.slice(0);
	var titleAdj = ['hipster', 'hand made', 'unforgettable', 'extravagant', 'unique', 'personalized', 'custom', 'unrivaled', 'fresh', 'stylish', 'premium', 'upgraded', 'exclusive', 'modern'];
	var titleNoun = ['fried chicken', 'retreat', 'service', 'opportunity', 'luxury', 'experience', 'style', 'relaxation', 'package'];
	for(var i = 0; i < howMany; i ++){
		var selectedImage = Math.floor(Math.random()*imagesArray.length);
		var deal = document.createElement('div');
		deal.className = 'deal-panel';
		var dealHeader = document.createElement('div');
		dealHeader.className = 'deal-panel-header';
		// dealHeader.style.backgroundImage = 'url(./assets/images/' + imagesArray[selectedImage].localurl + ')';
		dealHeader.style.backgroundImage = 'url(/assets/images/' + imagesArray[selectedImage].localurl + ')';
		dealHeader.setAttribute('actual-url', imagesArray[selectedImage].actualurl);
		dealHeader.setAttribute('disclaimer', 'This image used without explicit permission.');
		if(Math.random()<0.65){
			var daysLeft = Math.floor(Math.random()*8)+2;
			var limitedTime = document.createElement('div');
			limitedTime.className = 'limited-time-container';
			var ltText = document.createElement('div');
			ltText.className = 'cornered-text-days cornered-text';
			ltText.innerText = daysLeft;
			var ltWords = document.createElement('div');
			ltWords.className = 'cornered-text-words cornered-text';
			ltWords.innerHTML = 'days left<br>to purchase';
			var cornerOne = document.createElement('div');
			cornerOne.className = 'cornered corner';
			var cornerTwo = document.createElement('div');
			cornerTwo.className = 'cornered2 corner';
			limitedTime.appendChild(ltText);
			limitedTime.appendChild(ltWords);
			limitedTime.appendChild(cornerOne);
			limitedTime.appendChild(cornerTwo);
			dealHeader.appendChild(limitedTime);
		}
		deal.appendChild(dealHeader);
		var dealContent = document.createElement('div');
		dealContent.className = 'deal-panel-content';
		//create title span
		var dTitle = document.createElement('span');
		dTitle.className = 'deal-title-content';
		dTitle.innerText = titleAdj[Math.floor(Math.random()*titleAdj.length)] + ' ' + titleNoun[Math.floor(Math.random()*titleNoun.length)];
		dealContent.appendChild(dTitle);
		//create regular price div
		var firstPrice = Math.floor(Math.random()*200) + 150;
		var newPrice = Math.floor(((Math.random()*0.4)+0.1)*firstPrice);
		var regPriceDiv = document.createElement('div');
		regPriceDiv.className = 'deal-desc-div reg-price';
		var origPrice = document.createElement('span');
		var origPriceContent = document.createElement('span');
		origPrice.className = 'deal-label';
		origPrice.innerText = 'regular price: ';
		origPriceContent.className = 'deal-regprice-content';
		origPriceContent.innerText = '$' + firstPrice + '.00';
		regPriceDiv.appendChild(origPrice);
		regPriceDiv.appendChild(origPriceContent);
		dealContent.appendChild(regPriceDiv);
		//create now price div
		var nowPriceDiv = document.createElement('div');
		nowPriceDiv.className = 'deal-desc-div';
		var nowPrice = document.createElement('span');
		var nowPriceContent = document.createElement('span');
		nowPrice.className = 'deal-label dl-dealprice';
		nowPrice.innerText = 'NOW: ';
		nowPriceContent.className = 'deal-dealprice-content';
		nowPriceContent.innerText = '$' + newPrice + '.00';
		nowPriceDiv.appendChild(nowPrice);
		nowPriceDiv.appendChild(nowPriceContent);
		// nowPriceDiv.innerHTML = nowPrice + nowPriceContent;
		dealContent.appendChild(nowPriceDiv);
		//create created at div
		var createdAtDiv = document.createElement('div');
		createdAtDiv.className = 'deal-desc-div ddd-cu';
		var created = document.createElement('span');
		var createdContent = document.createElement('span');
		created.className = 'deal-label dl-cu';
		created.innerText = 'deal created at: ';
		createdContent.className = 'deal-created-content dl-cu';
		createdContent.innerText = 'date created unknown';
		createdAtDiv.appendChild(created);
		createdAtDiv.appendChild(createdContent);
		dealContent.appendChild(createdAtDiv);
		//create updated at div
		var updatedAtDiv = document.createElement('div');
		updatedAtDiv.className = 'deal-desc-div ddd-cu';
		var updated = document.createElement('span');
		var updatedContent = document.createElement('span');
		updated.className = 'deal-label dl-cu';
		updated.innerText = 'deal updated at: ';
		updatedContent.className = 'deal-updated-content dl-cu';
		updatedContent.innerText = 'date updated unknown';
		updatedAtDiv.appendChild(updated);
		updatedAtDiv.appendChild(updatedContent);
		dealContent.appendChild(updatedAtDiv);
		deal.appendChild(dealContent);
		//savings will be (originalPrice - price) / originalprice
		//var savings = document.createElement('span');
		//var savingsContent = document.createElement('span');
		document.getElementById('deal-container-ind').appendChild(deal);
		imagesArray.splice(selectedImage, 1);
	}
}

var dealImages = [
	{
		localurl: 'deal_image_01.jpg',
		actualurl:'http://www.hsalam-bamako.com/wp-content/uploads/2016/12/o-HAPPY-PEOPLE-facebook.jpg'
	},
	{
		localurl: 'deal_image_02.jpg',
		actualurl: 'http://youhaveacalling.com/wp-content/uploads/2012/05/Fun-Group-of-Young-People-Jump-19461599.jpg'
	},
	{
		localurl: 'deal_image_03.jpg',
		actualurl: 'http://www.siwallpaperhd.com/wp-content/uploads/2015/05/happy_people_colorful_wallpaper_hd_5.jpg'
	},
	{
		localurl: 'deal_image_04.jpg',
		actualurl: 'http://ultimate-luxury-community.com/wp-content/uploads/2011/10/MiSST-frontpage-red-girl-shopping-smaller-the-same.jpg'
	},
	{
		localurl: 'deal_image_05.jpg',
		actualurl: 'http://aplustexashomebuilders.com/wp-content/uploads/2015/09/luxury-homes-builders.jpg'
	},
	{
		localurl: 'deal_image_06.jpg',
		actualurl: 'http://www.eliteluxuryhomes.com/swserve/custom_themes/bootstrapeliteluxury/wctheme/images/home/location-beverly-hills.jpg'
	},
	{
		localurl: 'deal_image_07.jpg',
		actualurl: 'http://skylinegp.com/wp-content/uploads/2015/06/Chicago-Skyline.jpg'
	}
];