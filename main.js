(function () {
  // ========== DADOS DOS PRODUTOS ==========
  const products = [
    {
      id: 1,
      name: "Pacote de Bala de Goma 1kg",
      category: "balas",
      categoryLabel: "Balas",
      image:
        "https://images.tcdn.com.br/img/img_prod/388802/bala_de_goma_gomets_frutas_sortidas_960g_9954_1_2b72ee408d5caf6e8b2b53b81fb45b80.jpg",
      priceRetail: "R$ 25,00",
      priceWholesale: "R$ 22,00",
      wholesaleCondition: "a partir de 5kg",
      description:
        "Deliciosas balas de goma coloridas nos sabores morango, laranja, limão e uva. Embalagem de 1kg ideal para revenda em supermercados, lojas de conveniência e distribuidoras. Produto de alta qualidade com textura macia e sabor intenso.",
    },
    {
      id: 2,
      name: "Forminhas para Doces (Cento)",
      category: "confeitaria",
      categoryLabel: "Confeitaria",
      image:
        "https://cdn.awsli.com.br/2500/2500504/produto/185445600/n6-k3c2yhua41.jpg",
      priceRetail: "R$ 12,00",
      priceWholesale: "R$ 10,00",
      wholesaleCondition: "a partir de 10 centos",
      description:
        "Forminhas de papel para doces, brigadeiros e cupcakes. Cores sortidas vibrantes (rosa, azul, amarelo, verde). 100 unidades por pacote. Material resistente, antiaderente e decorativo. Perfeitas para confeitarias e buffets.",
    },
    {
      id: 3,
      name: "Chocolate em Barra Sicao 2kg",
      category: "chocolates",
      categoryLabel: "Chocolates",
      image:
        "https://lojasantoantonio.vtexassets.com/arquivos/ids/237750-800-800?v=638791956395770000&width=800&height=800&aspect=true",
      priceRetail: "R$ 89,00",
      priceWholesale: "R$ 82,00",
      wholesaleCondition: "a partir de 5 unidades",
      description:
        "Chocolate em barra Sicao de 2kg, ideal para confeitaria profissional e revenda. Cobertura saborosa com excelente derretimento. Perfeito para produção de ovos de Páscoa, bombons e sobremesas. Qualidade premium garantida.",
    },
    {
      id: 4,
      name: "Caixa de Bombom Sortido 500g",
      category: "chocolates",
      categoryLabel: "Chocolates",
      image:
        "https://drogariaspacheco.vteximg.com.br/arquivos/ids/1367684-1000-1000/757187---Caixa-de-Bombom-250g-Garoto-Sortidos-Nestle-Brasil_0000_6706cf4d19fa8300192276b4_2.png.png?v=638690074755800000",
      priceRetail: "R$ 35,00",
      priceWholesale: "R$ 31,00",
      wholesaleCondition: "a partir de 10 caixas",
      description:
        "Caixa com 500g de bombons sortidos recheados com brigadeiro, beijinho e ninho. Embalagem premium pronta para presente ou revenda imediata. Alta margem de lucro para o varejista.",
    },
    {
      id: 5,
      name: "Açúcar Colorido 1kg",
      category: "confeitaria",
      categoryLabel: "Confeitaria",
      image:
        "https://lojasantoantonio.vtexassets.com/arquivos/ids/236365/202967-Acucar-Colorido-Amarelo-300g-Mil-Cores-MAVALA%E2%80%B0RIO.jpg?v=638768808277530000",
      priceRetail: "R$ 18,00",
      priceWholesale: "R$ 15,50",
      wholesaleCondition: "a partir de 8kg",
      description:
        "Açúcar cristal colorido para decoração de bolos, cupcakes e doces finos. Cores vibrantes que não desbotam. 1kg por pacote. Disponível nas cores: rosa, azul, verde, amarelo e vermelho.",
    },
    {
      id: 6,
      name: "Embalagens p/ Brigadeiro (50 un)",
      category: "artigos-festa",
      categoryLabel: "Artigos de Festa",
      image: "https://http2.mlstatic.com/D_681257-MLB79234959009_092024-C.jpg",
      priceRetail: "R$ 15,00",
      priceWholesale: "R$ 13,00",
      wholesaleCondition: "a partir de 20 pacotes",
      description:
        "Kit com 50 embalagens plásticas transparentes para brigadeiros, beijinhos e docinhos de festa. Inclui fitilho decorativo. Design elegante que valoriza o produto final. Ideal para festas infantis e eventos.",
    },
  ];

  // ========== ELEMENTOS DO DOM ==========
  const productsGrid = document.getElementById("productsGrid");
  const emptyState = document.getElementById("emptyState");
  const resultsNumber = document.getElementById("resultsNumber");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");
  const searchInput = document.getElementById("searchInput");
  const searchInputMobile = document.getElementById("searchInputMobile");
  const categoryPills = document.querySelectorAll(".category-pill");
  const modal = document.getElementById("productModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalDescription = document.getElementById("modalDescription");
  const modalPriceRetail = document.getElementById("modalPriceRetail");
  const modalPriceWholesale = document.getElementById("modalPriceWholesale");
  const modalWholesaleCondition = document.getElementById(
    "modalWholesaleCondition",
  );
  const whatsappLink = document.getElementById("whatsappLink");

  // ========== ESTADO ==========
  let activeCategory = "all";
  let searchQuery = "";
  const whatsappNumber = "5567998141785";

  // ========== FUNÇÕES ==========
  function getFilteredProducts() {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  function renderProducts() {
    const filtered = getFilteredProducts();
    const count = filtered.length;

    // Atualizar contador
    resultsNumber.textContent = count;
    if (activeCategory !== "all" || searchQuery !== "") {
      clearFiltersBtn.classList.remove("hidden");
    } else {
      clearFiltersBtn.classList.add("hidden");
    }

    // Mostrar/esconder grid e empty state
    if (count === 0) {
      productsGrid.classList.add("hidden");
      emptyState.classList.remove("hidden");
      emptyState.classList.add("flex");
    } else {
      productsGrid.classList.remove("hidden");
      emptyState.classList.add("hidden");
      emptyState.classList.remove("flex");
    }

    // Renderizar cards
    productsGrid.innerHTML = filtered
      .map(
        (product, index) => `
                        <div class="product-card bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all duration-300 cursor-pointer group flex flex-col"
                             onclick="window._openProductModal(${product.id})"
                             style="animation-delay: ${index * 0.06}s;">
                            <!-- Imagem -->
                            <div class="relative aspect-square bg-gray-50 overflow-hidden">
                                <img
                                    src="${product.image}"
                                    alt="${product.name}"
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                                    loading="lazy"
                                >
                                <!-- Badge de categoria no canto -->
                                <span class="absolute top-2 left-2 text-[10px] font-semibold bg-white/90 backdrop-blur-sm text-brand-700 px-2 py-0.5 rounded-full shadow-sm">
                                    ${product.categoryLabel}
                                </span>
                                <!-- Ícone de clique -->
                                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5">
                                    <span class="bg-white/95 backdrop-blur-sm text-brand-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                        Ver Detalhes
                                    </span>
                                </div>
                            </div>
                            <!-- Conteúdo -->
                            <div class="p-3 md:p-4 flex flex-col flex-1">
                                <h3 class="font-semibold text-sm md:text-base text-gray-900 leading-tight mb-2 line-clamp-2 flex-1">
                                    ${product.name}
                                </h3>
                                <div class="space-y-1 mt-auto">
                                    <div class="flex items-center justify-between">
                                        <span class="text-xs text-gray-400">Varejo</span>
                                        <span class="font-bold text-gray-800 text-sm md:text-base">${product.priceRetail}</span>
                                    </div>
                                    <div class="flex items-center justify-between pt-1 border-t border-gray-100">
                                        <span class="text-xs text-green-600 font-medium">Atacado</span>
                                        <span class="font-extrabold text-green-600 text-sm md:text-base">${product.priceWholesale}</span>
                                    </div>
                                </div>
                                <button
                                    class="mt-3 w-full py-2 bg-brand-50 text-brand-700 font-semibold text-xs md:text-sm rounded-lg hover:bg-brand-100 transition-colors flex items-center justify-center gap-1.5"
                                    onclick="event.stopPropagation(); window._openProductModal(${product.id})"
                                >
                                    <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                                    Ver Detalhes
                                </button>
                            </div>
                        </div>
                    `,
      )
      .join("");

    // Reinicializar ícones Lucide nos cards recém-renderizados
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  function openProductModal(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // Preencher dados do modal
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalTitle.textContent = product.name;
    modalCategory.textContent = product.categoryLabel;
    modalDescription.textContent = product.description;
    modalPriceRetail.textContent = product.priceRetail;
    modalPriceWholesale.textContent = product.priceWholesale;
    modalWholesaleCondition.textContent = product.wholesaleCondition;

    // Gerar link do WhatsApp
    const message = encodeURIComponent(
      `Olá! Gostaria de saber mais sobre o produto *${product.name}* que vi no site.`,
    );
    whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Abrir modal
    modal.classList.remove("hidden");
    modal.classList.add("visible");
    document.body.style.overflow = "hidden";

    // Reinicializar ícones dentro do modal
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  function closeProductModal() {
    modal.classList.add("hidden");
    modal.classList.remove("visible");
    document.body.style.overflow = "";
  }

  function setActiveCategory(category) {
    activeCategory = category;
    // Atualizar pills visuais
    categoryPills.forEach((pill) => {
      const pillCategory = pill.getAttribute("data-category");
      if (pillCategory === category) {
        pill.classList.remove(
          "bg-gray-100",
          "text-gray-600",
          "hover:bg-gray-200",
        );
        pill.classList.add(
          "bg-brand-600",
          "text-white",
          "shadow-md",
          "shadow-brand-200",
        );
        pill.setAttribute("aria-pressed", "true");
      } else {
        pill.classList.remove(
          "bg-brand-600",
          "text-white",
          "shadow-md",
          "shadow-brand-200",
        );
        pill.classList.add("bg-gray-100", "text-gray-600", "hover:bg-gray-200");
        pill.setAttribute("aria-pressed", "false");
      }
    });
    renderProducts();
    // Rolar grid para o topo suavemente
    productsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function clearAllFilters() {
    activeCategory = "all";
    searchQuery = "";
    if (searchInput) searchInput.value = "";
    if (searchInputMobile) searchInputMobile.value = "";
    // Resetar pills
    categoryPills.forEach((pill) => {
      const pillCategory = pill.getAttribute("data-category");
      if (pillCategory === "all") {
        pill.classList.remove(
          "bg-gray-100",
          "text-gray-600",
          "hover:bg-gray-200",
        );
        pill.classList.add(
          "bg-brand-600",
          "text-white",
          "shadow-md",
          "shadow-brand-200",
        );
        pill.setAttribute("aria-pressed", "true");
      } else {
        pill.classList.remove(
          "bg-brand-600",
          "text-white",
          "shadow-md",
          "shadow-brand-200",
        );
        pill.classList.add("bg-gray-100", "text-gray-600", "hover:bg-gray-200");
        pill.setAttribute("aria-pressed", "false");
      }
    });
    renderProducts();
    productsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ========== EVENT LISTENERS ==========
  // Busca (desktop)
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchQuery = this.value.trim();
      // Sincronizar busca mobile
      if (searchInputMobile && searchInputMobile.value !== this.value) {
        searchInputMobile.value = this.value;
      }
      renderProducts();
    });
  }

  // Busca (mobile)
  if (searchInputMobile) {
    searchInputMobile.addEventListener("input", function () {
      searchQuery = this.value.trim();
      // Sincronizar busca desktop
      if (searchInput && searchInput.value !== this.value) {
        searchInput.value = this.value;
      }
      renderProducts();
    });
  }

  // Categorias
  categoryPills.forEach((pill) => {
    pill.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      setActiveCategory(category);
    });
  });

  // Fechar modal
  closeModalBtn.addEventListener("click", closeProductModal);
  modalBackdrop.addEventListener("click", closeProductModal);

  // Fechar modal com tecla Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("visible")) {
      closeProductModal();
    }
  });

  // Prevenir scroll do body quando modal aberto e o usuário rola dentro do modal
  modal.addEventListener(
    "wheel",
    function (e) {
      const modalContent = modal.querySelector(".modal-content");
      if (modalContent) {
        const atTop = modalContent.scrollTop === 0;
        const atBottom =
          modalContent.scrollTop + modalContent.clientHeight >=
          modalContent.scrollHeight - 1;
        if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
          // Permite que o evento se propague se estamos no limite
        } else {
          e.stopPropagation();
        }
      }
    },
    { passive: false },
  );

  // Expor função global para os cards
  window._openProductModal = openProductModal;

  // ========== RENDERIZAÇÃO INICIAL ==========
  renderProducts();

  // Inicializar ícones Lucide
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  console.log("🍬 Casa dos Doces — Vitrine Digital carregada com sucesso!");
  console.log(
    "📱 " + products.length + " produtos disponíveis para demonstração.",
  );
  console.log("💬 WhatsApp: +" + whatsappNumber);
})();
