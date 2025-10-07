/* script.js — minimal frontend logic: products, cart in localStorage, forms */
const products = [
  // Example products. Replace image paths and add more items.
  { id: 'p1', title: 'Blue Ballpoint Pen', category: 'Writing & Drawing', price: 200, img: 'https://lh3.googleusercontent.com/p_hvW5CNkjeLjFtUJOXCksT_Y5CAk7OrIi_ja-sTZVM9Ov4twIs5CJAKEHJQDsTypZQsX48UFVrWAb3Q=s265-w265-h265' },
  { id: 'p2', title: 'A4 Paper Ream (500 sheets)', category: 'Paper & Books', price: 13000, img: 'https://lh3.googleusercontent.com/VkCCClusnNjMKQvbgMtzYMY4fAhs8weCaPKqc1aruXVLvLmRX9JlYWouMpnT8wvf18p2MDd601zohpTM=s265-w265-h265' },
  { id: 'p3', title: 'Notebook A5', category: 'Paper & Books', price: 8000, img: 'https://lh3.googleusercontent.com/hMSNb1XwkjmMfPJhnlsyfnEneplCn99KvaSrx3ZLqWLguxYAJwdtcIK4ipTKcL4nlRJpCCrc6I0HdSXD=s265-w265-h265' },
  { id: 'p4', title: 'Notebook A6', category: 'Paper & Books', price: 4000, img: 'https://lh3.googleusercontent.com/jL_q3HEg65NDza1Mg-m8xZl-wwIzlf_cIocCnyDr4Au36VlGTLxLVIVHvs_2rV2RB0aDWc6ZFXdv6k97=s265-w265-h265' },
  { id: 'p5', title: 'Stapler (Office)', category: 'Office Essentials', price: 9000, img: 'https://lh3.googleusercontent.com/30qjlkE7c1Bz6IBsifVk8XhUGPEX6YDMH_6WJC1xjsil-LPT6Sa1khnQiXG1qHAragxkyY8DGA65kcfl=s265-w265-h265' },
  { id: 'p6', title: 'Mathematical Set', category: 'School Supplies', price: 3000, img: 'https://lh3.googleusercontent.com/-eAulxTpNAqfW5u1qHLIR4PcpWw9DQImdyQ0-mYw9l_KUHQ_7rk71wsJPirkY_eNcd-cNJPAbgeGuDAx=s265-w265-h265' },
  { id: 'p7', title: 'Dictionary', category: 'Books', price: 15000, img: 'https://lh3.googleusercontent.com/oIELgOByVWUTibfQmwx_s2yn2952vaUOl4vHm5yQnqiV42kywbaQF9ZNjXxw7aRzqtCC-l0zwYSfGkaf=s265-w265-h265' },
  { id: 'p8', title: 'Counter Book Q2', category: 'Books & Records', price: 2500, img: 'https://lh3.googleusercontent.com/mcY6td427pqfF-uPPowVfpL6DFV2_nmBrFMBKNN2FaZVMh1ROgHMIn_RxPwIxsvuChk20ui5LIdbF2CK=s265-w265-h265' },
  { id: 'p9', title: 'Counter Book Q3', category: 'Books & Records', price: 3000, img: 'https://lh3.googleusercontent.com/Whcv6meJgFhaTv8qDTmKEahsiikXhV1jYLaxw8cqC-8wxrWZPzlH_qRvprmKMYfIcgKHqxQiDpoBLuIv=s265-w265-h265' },
  { id: 'p10', title: 'Soltep Small', category: 'Stationery Accessories', price: 500, img: 'https://lh3.googleusercontent.com/9Rxe01ELTiCvlcKf7LjEcJeyV-uTtJ-u_joZnCEhIU9cYMuycDl3rfpaJ_WNYfqSCp43XNY6fEn0ekj5=s265-w265-h265' },
  { id: 'p11', title: 'Soltep Medium', category: 'Stationery Accessories', price: 3000, img: 'https://lh3.googleusercontent.com/1BwACSa68ShRQcf7rdM1S7T4u61MQGMtuSvBkoo2zTImaULmRpX9eTYHmU7pQubMZFTQd0scawFbwyjp=s265-w265-h265' },
  { id: 'p12', title: 'Soltep Huge', category: 'Stationery Accessories', price: 5000, img: 'https://lh3.googleusercontent.com/C71vOlKwCOAKPkXPV5TmJg4HNqWEpckhq002pij5KiwReoa3Gv8BG-kBcdw-azHG9z7Hck07TmE0GLC5=s265-w265-h265' },
  { id: 'p13', title: 'File Small', category: 'Office Essentials', price: 2000, img: 'https://lh3.googleusercontent.com/EhjJDROtgg76ZPgJAynushEwZ4f9DprSecDffG22GeOj3lBdf0gIB3NBmnBakRzLdf0wBkkgL6PfzAUW=s265-w265-h265' },
  { id: 'p14', title: 'File Medium', category: 'Office Essentials', price: 3000, img: 'https://lh3.googleusercontent.com/hUNHu5MOqPVMILuYP7cqJm4d1wwOcYi7HRiwHac2P39VzOTyKhD0gBp7sNI3vTNp11QSIL68OwU72y2L=s265-w265-h265' },
  { id: 'p15', title: 'File Huge', category: 'Office Essentials', price: 4000, img: 'https://lh3.googleusercontent.com/GHGfe5uGeuX2t5dabzihdYFh_nQWS_ZdGRgTrkSqi4sC8Z7if5HM_sHQr0f8cf21FG8ZFWQHMaGFm0lI=s265-w265-h265' },
  { id: 'p16', title: 'Frames', category: 'Decorations', price: 7000, img: 'https://lh3.googleusercontent.com/3N8O1V9puLxbuVqboeayGupnE0xz-hlAPcJRS2OqH5uHYUlhZFiKuMbnJTtEnfSYYlj0uuL7y2nF6A09=s265-w265-h265' },
  { id: 'p17', title: 'Exercise Book Small', category: 'Books & Records', price: 800, img: 'https://lh3.googleusercontent.com/puiZmN4uD-EaFxOk9JNBe3ZVRAn1YykyubaTq6mQDukHySmS3EOY6RPLdTpnqTadY86e9V2QlA5XXMxy=s265-w265-h265' },
  { id: 'p18', title: 'Exercise Book Medium', category: 'Books & Records', price: 1200, img: 'https://lh3.googleusercontent.com/v97Lyl5IIP1FU1BiEhZt1hYKVSQUnq4s2B4bg9y6T2GBZEGsjpUeV8vRMSTy2QL1aF2oBRWHJFgGGibB=s265-w265-h265' },
  { id: 'p19', title: 'Exercise Book Large', category: 'Books & Records', price: 1500, img: 'https://lh3.googleusercontent.com/tzQMntkcQzXE38qDOcO1oUObwUsq9Tsb5PCzZFbINp5fyXdpQW2ZVdbSniB6Tk_FLcy-82UR38o43lMW=s265-w265-h265' },
  { id: 'p20', title: 'Black Marker', category: 'Writing & Drawing', price: 500, img: 'https://lh3.googleusercontent.com/hR8jiqkSCw-4Blrqp6fo9NCL7TXkWD6xzYj7kyM5GnAitsdDxzN-G5dWQoSP4IWTxZdmkuFndpxn52v6=s265-w265-h265' }
];

function $(s){return document.querySelector(s)}
function $all(s){return document.querySelectorAll(s)}

function saveCart(cart){localStorage.setItem('adam_cart', JSON.stringify(cart))}
function loadCart(){try{return JSON.parse(localStorage.getItem('adam_cart'))||[] }catch(e){return []}}

function updateCartCountUI(){
  const cart = loadCart()
  const count = cart.reduce((s,i)=>s+i.qty,0)
  $all('#cartCount, #cartCountTop').forEach(el=>{ if(el) el.textContent = count })
}

function addToCart(productId){
  const cart = loadCart()
  const item = cart.find(i=>i.id===productId)
  if(item) item.qty += 1
  else cart.push({ id: productId, qty: 1 })
  saveCart(cart)
  updateCartCountUI()
  alert('Added to cart')
}

/* Render featured on home and product grid */
function renderProductsGrid(targetSelector, featured=false){
  const target = document.querySelector(targetSelector)
  if(!target) return
  target.innerHTML = ''
  const list = featured ? products.slice(0,4) : products
  list.forEach(p=>{
    const card = document.createElement('article')
    card.className = 'product-card'
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" onerror="this.src='logo.jpg'"/>
      <div class="product-title">${p.title}</div>
      <div class="product-meta">${p.category} • TSH ${p.price}</div>
      <div class="product-actions">
        <button class="btn add-btn" data-id="${p.id}">Add to cart</button>
        <a class="btn outline" href="order.html">Order</a>
      </div>
    `
    target.appendChild(card)
  })
  // attach add buttons
  target.querySelectorAll('.add-btn').forEach(b=>{
    b.addEventListener('click', e=>{
      addToCart(b.dataset.id)
    })
  })
}

/* Product filters */
function setupProductsPage(){
  renderProductsGrid('#productsGrid', false)
  const search = $('#searchInput')
  const filter = $('#categoryFilter')
  if(search){
    search.addEventListener('input', ()=>{
      const q = search.value.trim().toLowerCase()
      const cat = filter.value
      const filtered = products.filter(p=>{
        const matchQ = p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
        const matchCat = !cat || p.category === cat
        return matchQ && matchCat
      })
      const target = $('#productsGrid')
      target.innerHTML = ''
      filtered.forEach(p=>{
        const card = document.createElement('article')
        card.className = 'product-card'
        card.innerHTML = `
          <img src="${p.img}" alt="${p.title}" onerror="this.src='logo.jpg'"/>
          <div class="product-title">${p.title}</div>
          <div class="product-meta">${p.category} • TSH ${p.price}</div>
          <div class="product-actions">
            <button class="btn add-btn" data-id="${p.id}">Add to cart</button>
            <a class="btn outline" href="order.html">Order</a>
          </div>
        `
        target.appendChild(card)
      })
      target.querySelectorAll('.add-btn').forEach(b=>{
        b.addEventListener('click', ()=> addToCart(b.dataset.id))
      })
    })
  }
  if(filter){
    filter.addEventListener('change', ()=> { search?.dispatchEvent(new Event('input')) })
  }
}

/* Forms: order, request, contact — here we just simulate submission and show confirmation */
function setupForms(){
  const orderForm = $('#orderForm')
  if(orderForm){
    orderForm.addEventListener('submit', e=>{
      e.preventDefault()
      const name = $('#custName').value
      const phone = $('#custPhone').value
      const address = $('#custAddress').value
      const details = $('#orderItems').value || JSON.stringify(loadCart())
      // In real app: send to server or email. Here we simulate.
      $('#orderMsg').textContent = `Thanks ${name}. Your order was received. We will contact you at ${phone}.`
      localStorage.removeItem('adam_cart')
      updateCartCountUI()
    })
    $('#clearCartBtn')?.addEventListener('click', ()=>{
      localStorage.removeItem('adam_cart')
      updateCartCountUI()
      alert('Cart cleared')
    })
  }

  const requestForm = $('#requestForm')
  if(requestForm){
    requestForm.addEventListener('submit', e=>{
      e.preventDefault()
      $('#requestMsg').textContent = 'Request submitted. We will contact you shortly with a quote.'
      requestForm.reset()
    })
  }

  const contactForm = $('#contactForm')
  if(contactForm){
    contactForm.addEventListener('submit', e=>{
      e.preventDefault()
      $('#contactMsg').textContent = 'Message sent. Thank you — we will reply soon.'
      contactForm.reset()
    })
  }

  // quick handler for cart button
  const cartBtn = $('#cartBtn')
  if(cartBtn) cartBtn.addEventListener('click', ()=> location.href = 'order.html')
}

/* initial render on page load */
document.addEventListener('DOMContentLoaded', ()=>{
  updateCartCountUI()
  // set year in footers
  const year = new Date().getFullYear()
  $all('#year,#year2,#year3,#year4,#year5,#year6').forEach(el=>{ if(el) el.textContent = year })

  // render featured where present
  renderProductsGrid('#featuredGrid', true)

  // if products page present
  if(document.querySelector('#productsGrid')) setupProductsPage()
  setupForms()
})