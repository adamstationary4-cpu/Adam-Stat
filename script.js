/* script.js — minimal frontend logic: products, cart in localStorage, forms */
const products = [
  // Example products. Replace image paths and add more items.
  { id: 'p1', title: 'Blue Ballpoint Pen', category: 'Writing & Drawing', price: 120, img: 'products/pen-blue.jpg' },
  { id: 'p2', title: 'A4 Paper Ream (500 sheets)', category: 'Paper & Books', price: 1500, img: 'products/a4-ream.jpg' },
  { id: 'p3', title: 'Notebook A5', category: 'Paper & Books', price: 300, img: 'products/a5-notebook.jpg' },
  { id: 'p4', title: 'Black Marker', category: 'Writing & Drawing', price: 250, img: 'products/marker.jpg' },
  { id: 'p5', title: 'Stapler (Office)', category: 'Office Essentials', price: 800, img: 'products/stapler.jpg' }
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