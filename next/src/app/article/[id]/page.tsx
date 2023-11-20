export default function IdDetail({ params }) {
    const { id } = params;
    console.log(params);
    
    return (
        <p>Page détail du produit {id}</p>
    );
}
