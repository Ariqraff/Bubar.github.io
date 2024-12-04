document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Vernichte', img: '1.jpg', price:35000},
      { id: 2, name: 'Garfield', img: '7.jpg', price:35000},
      { id: 3, name: 'Trust God', img: '3.jpg', price:35000},
      { id: 4, name: 'Diving', img: '4.jpg', price:35000},
      { id: 5, name: 'Feel The Fear', img: '5.jpg', price:35000},
      { id: 6, name: 'Gloria Revelada', img: '6.jpg', price:35000},
      { id: 7, name: 'Square Brown', img: '21.jpg', price:35000},
      { id: 8, name: 'Square Broken White', img: '20.jpg', price:35000},
      { id: 9, name: 'Square Dark Blue', img: '22.jpg', price:35000},
      { id: 10, name: 'Square Brown Coffee', img: '23.jpg', price:35000},
      { id: 11, name: 'Square Cappucino', img: '24.jpg', price:35000},
      { id: 12, name: 'Shirt Flannel', img: '25.jpg', price:35000},
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity:0,
    add(newItem) {
      // Cek Barang terlebih dahulu
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // Jika kosong
      if(!cartItem) {
        this.items.push({...newItem, quantity: 1, total: newItem.price});
        this.quantity++;
        this.total += newItem.price;

      }else {
        // Jika barang sudah ada
        this.items = this.items.map((item) => {
          if(item.id !== newItem.id) {
            return item;
          } else {
            // Jika barang sudah ada, maka tambah quantity nya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        })
      }
    },
    remove(id) {
      // Item yg mau diremove sesuai ID
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if(cartItem.quantity > 1) {
        // Cari!!
        this.items = this.items.map((item) => {
          // harus cocok dengan id!!
          if(item.id !== id ) {
            return item;
          }else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        })
      } else if (cartItem.quantity === 1) {
        // Jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  })
});

//form validation
// const checkoutButton = document.querySelector('.checkout-button');
// checkoutButton.disabled = true; // Tombol dinonaktifkan secara default

// const form = document.querySelector('#checkoutForm');

// form.addEventListener('keyup', function() {
//   let allFieldsFilled = true; // Asumsikan semua elemen formulir terisi

//   for (let i = 0; i < form.elements.length; i++) {
//     if (form.elements[i].value.trim() === "") { // Jika ada elemen kosong
//       allFieldsFilled = false;
//       break; // Tidak perlu melanjutkan loop
//     }
//   }

//   if (allFieldsFilled) {
//     checkoutButton.disabled = false; // Aktifkan tombol
//     checkoutButton.classList.remove('disabled'); // Hapus kelas 'disabled'
//   } else {
//     checkoutButton.disabled = true; // Nonaktifkan tombol
//     checkoutButton.classList.add('disabled'); // Tambahkan kelas 'disabled'
//   }
// });


//form validation gpt
const form = document.querySelector('#checkoutForm');
const checkoutButton = document.querySelector('#checkout-button');

// Disable the button initially
checkoutButton.disabled = true;

// Add event listener to check form input
checkoutForm.addEventListener('keyup', function () {
  let allFieldsFilled = true;

  // Check each input inside the form
  const inputs = checkoutForm.querySelectorAll('input');
  inputs.forEach(input => {
    if (input.value.trim() === "") {
      allFieldsFilled = false;
    }
  });

  // Enable or disable the button based on form completion
  if (allFieldsFilled) {
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
  } else {
    checkoutButton.disabled = true;
    checkoutButton.classList.add('disabled');
  }
});



//kirim data
checkoutButton.addEventListener('click', async function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  // window.open('http://wa.me/628998341502?text=' + encodeURIComponent(message));
  
  // request fetch

  try {
    const response = await fetch('php/placeOrder.php', {
      method: 'POST',
      body: data,
    });
    const token = await response.text();
    // console.log(token);
    window.snap.pay(token);
  }catch(err){
    console.log(err.message);
  }

})

//format WA
const formatMessage = (obj) => {
  return `Data Customer
  Nama  : ${obj.nama}
  Email : ${obj.email}
  No Telpon : ${obj.phone}
Data Pesanan 
  ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${Rupiah(item.total)}) \n`)}
Total : ${Rupiah(obj.total)}
Terima Kasih`;
} 
// Rupiah
const Rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
}

