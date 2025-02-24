import { Link } from 'react-router-dom';

const items = [
  {
    id: 1,
    name: 'Adem Jashari',
    href: '#',
    lifetime: '1945-1999',
    description: 'Komandat i UÇK',
    imageSrc: 'https://images.saatchiart.com/saatchi/2365063/art/11797371/10859611-RNNZRKEZ-7.jpg',
  },
  {
    id: 2,
    name: 'Gjergj Kastrioti - Skenderbeu',
    href: '#',
    lifetime: '1445-1502',
    description: 'Gjeneral i ushtris',
    imageSrc: 'https://albanianculturalportraits.com/cdn/shop/files/D8932F65-DFDF-480A-9A79-209FF8817224.jpg?v=1735741687',
  },
  
  {
    id: 3,
    name: 'Focus Carry Case',
    href: '#',
    lifetime: '$32',
    description: 'Heather Gray',
    imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-01-image-card-03.jpg',
  },
  // More products...
]

export default function Explore() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 id="products-heading" className="sr-only">
          Lista
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {items.map((product) => (
            <Link key={product.id}  to={`/single/${product.id}`} className="group">
              <img
                alt={product.name}
                src={product.imageSrc}
                className="aspect-square w-full overflow-hidden rounded-lg object-cover group-hover:opacity-75 sm:aspect-[2/3]"
              />
              <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                <h3>{product.name}</h3>
                <p className="text-gray-500 text-sm font-light">{product.lifetime}</p>
              </div>
              <p className="mt-1 text-sm italic text-gray-500">{product.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
