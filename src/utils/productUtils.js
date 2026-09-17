/**
 * Determines a realistic weight/unit for products based on category and title.
 * E.g., Groceries -> '1 kg', '500g', '1 Litre'; Beauty -> '50 ml', etc.
 */
export const getProductUnit = (product) => {
  if (!product) return '1 Unit';

  // If API already provided explicit weight or unit text
  if (product.weight && typeof product.weight === 'string') {
    return product.weight;
  }

  const category = (product.category || '').toLowerCase();
  const title = (product.title || '').toLowerCase();

  if (category === 'groceries') {
    if (
      title.includes('apple') ||
      title.includes('banana') ||
      title.includes('orange') ||
      title.includes('potato') ||
      title.includes('onion') ||
      title.includes('rice') ||
      title.includes('flour') ||
      title.includes('sugar') ||
      title.includes('mango') ||
      title.includes('grapes')
    ) {
      return '1 kg';
    }
    if (
      title.includes('milk') ||
      title.includes('juice') ||
      title.includes('oil') ||
      title.includes('water') ||
      title.includes('beverage')
    ) {
      return '1 Litre';
    }
    if (
      title.includes('coffee') ||
      title.includes('tea') ||
      title.includes('honey') ||
      title.includes('spice') ||
      title.includes('salt') ||
      title.includes('butter') ||
      title.includes('cheese')
    ) {
      return '500g';
    }
    if (title.includes('egg') || title.includes('eggs')) {
      return '12 pcs (1 Tray)';
    }
    return '1 kg';
  }

  if (category === 'beauty' || category === 'skin-care') {
    return '50 ml';
  }

  if (category === 'fragrances') {
    return '100 ml';
  }

  return '1 Unit';
};
