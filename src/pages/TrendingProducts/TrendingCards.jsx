
const TrendingCards = () => {


    
    return (
        <div>
            {
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
                    {
                        products?.map(product => <ProductCard
                            product={product}
                            key={product?._id}></ProductCard>)
                    }
                </div>
            }
        </div>
    );
};

export default TrendingCards;