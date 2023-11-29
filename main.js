const url = "https://fakestoreapi.com/products";
const cart = [];
const barang = [];

const ambilData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  barang.push(data);
  const divProduk = document.getElementsByClassName("div-produk");
  
  data.forEach((item) => {
    divProduk[0].innerHTML += `
      <div class="bg-gray-800 p-3 text-white">
        <img src="${item.image}" class="w-full h-56 object-cover"/>
        <span class="block font-bold text-xl title">${item.title}</span>
        <span class="block category">${item.category}</span>
        <span class="block description">${item.description}</span>
        <button class="bg-sky-500 px-3 py-1 rounded text-black">Tambah ke keranjang</button>
      </div>
    `;
  });

  let totalkeranjang = document.getElementsByClassName("cart_count")[0]
  const btnAddCart = document.getElementsByTagName("button");


  Array.from(btnAddCart).forEach((tombol) => {
    tombol.addEventListener("click", function () {
        //ambil title,kategori,dan deskripsi di tommbol yang di klik
      let title = tombol.closest("div").querySelector(".title").innerText;
      let category = tombol.closest("div").querySelector(".category").innerText;
      let description = tombol.closest("div").querySelector(".description").innerText;
      
      // untuk menambah jumblah keranjang
      cart.push({"title": title, "category": category, "description": description})
      
      //update total keranjang 
      totalkeranjang.innerText = cart.length

    });
  });
};
ambilData();

const modalkeranjang = document.getElementsByClassName("modal")[0]
const btnTutup = document.getElementsByClassName("btn-tutup")[0]
const btnTampilKeranjang = document.getElementsByClassName("tampil-keranjang")[0]
const keranjangAnda = document.getElementsByClassName("keranjang-anda")[0]

btnTutup.addEventListener("click",() => {
    modalkeranjang.classList.add("hidden")
})

btnTampilKeranjang.addEventListener("click", () => {
    modalkeranjang.classList.remove("hidden")
    
    cart.forEach((item,index) => {
        keranjangAnda.innerHTML += `
            <div class="bg-white text-black rounded my-3 p-3">
                <span class="block font-bold text-xl">${item.title}</span>
                <span class="block font-semibold text-md">${item.category}</span>
                <span class="block ">${item.description}</span>
                <button class="bg-red-500 px-3 py-1 rounded text-black" onclick="clickHapusKeranjang(${index})">hapus</button>        
            </div>
        `
    })
})
 
//fungsi untuk menghapus produk di keranjang
function clickHapusKeranjang(index){
  //hapus item yang di tentukan dari array
  cart.splice(index, 1);

  //hapus isi elemen html
  keranjangAnda.innerHTML = '';

  //memperbarui tampilan keranjang yang telah di hapus
  cart.forEach((item, i) => {
    keranjangAnda.innerHTML += `
      <div class="bg-white rounded my-3 p-3 text-black">
        <span class="block font-bold text-xl">${item.title}</span>
        <span class="blovk font-semibold text-md">${item.category}</span>
        <span class="block ">${item.description}</span>
        <button class="bg-red-500 px-3 py-1 rounded text-black" onclick="clickHapusKeranjang(${i})">Hapus</button>
      </div>
    `
  })

  //memperbaharui jumlah total keranjang
  const KeranjangHitungElement = document.querySelector(".cart_count");
  KeranjangHitungElement.innerHTML = `${cart.length}`;

  //memeriksa keranjang 
  if (cart.length == 0) {
    modalkeranjang.classList.add("hidden");
  }

}
//fungsi untuk mencari produk
const searchbar = document.querySelector(".searchbar");
searchbar.addEventListener("keyup", (e) => {
  let namaBarang = e.target.value.toLowerCase();
  const hasilcari = barang[0].filter((item) => {
    return item.title.toLowerCase().includes(namaBarang);
  });
  const divProduk = document.getElementsByClassName("div-produk");
  divProduk[0].innerHTML = "";
  hasilcari.forEach((item) => {
    divProduk[0].innerHTML += `
      <div class="bg-gray-800 p-3 text-white">
        <img src="${item.image}" class="w-full h-56 object-cover"/>
        <span class="block font-bold text-xl title">${item.title}</span>
        <span class="block category">${item.category}</span>
        <span class="block description">${item.description}</span>
        <button class="bg-sky-500 px-3 py-1 rounded text-black">Tambah ke keranjang</button>
      </div>
    `;
  });
});