const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //  console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    // console.log('is show all',  isShowAll)

    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone)

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100  p-4 mt-8 shadow-xl`;

        phoneCard.innerHTML = `
        <figure>
                        <img src="${phone.image}"
                            alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts
                        </p>
                        <div class="card-actions justify-center">
                            <button onClick="handleShowDetail('${phone.slug}');" class="btn btn-primary">Show details</button>
                        </div>
        `
            ;
        phoneContainer.appendChild(phoneCard)
    })
    // hide loadingSpinner
    toggleLoadingSpinner(false);

}

const handleShowDetail = async(id) =>{
    console.log('clicked', id)
 const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);

 const data = await res.json();
const phone = data.data;

    showPhoneDetails(phone);
}

const showPhoneDetails = phone =>{
    console.log(phone)

const phoneName = document.getElementById('show-detail-phone-name');
phoneName.innerText =phone.name;

const showDetaiContainer = document.getElementById('show-detail-container')

showDetaiContainer.innerHTML = `
    <img class="justify-center text-center w-36 p-5 mx-auto" src="${phone.image}"/>
    <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold">Display: </span>${phone?.mainFeatures?.displaySize
}</p>
<p><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet
}</p>
<p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory
}</p>
<p><span class="font-bold">Slug: </span>${phone?.slug
}</p>
<p><span class="font-bold">Release date: </span>${phone?.releaseDate
}</p>
<p><span class="font-bold">Brand: </span>${phone?.brand
}</p>
<p><span class="font-bold">GPS: </span>${phone?.others?.GPS
}</p>




`


   Show_details_modal.showModal();
}

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoding) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoding) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}

loadPhone();