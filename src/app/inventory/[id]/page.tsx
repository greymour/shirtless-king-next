export default function Page({ params }: { params: { id: string } }) {
  return <div>My Inventory item: {params.id}</div>
}