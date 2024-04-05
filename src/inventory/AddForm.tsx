'use client'
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { InsertInventoryItem, InsertSize } from 'db/schema';
import { Input } from '@/components/atoms';

type TSize = Partial<InsertSize> & { isEditing?: boolean }

function SizeInput(size: TSize & { setSizes: Dispatch<SetStateAction<TSize[]>>}) {
  const [sizeLabel, setSize] = useState(size?.size || 'M');
  const [price, setPrice] = useState(size?.price || 20);
  const [editing, setEditing] = useState(size?.isEditing || false);
  return (
   // display grid isn't working here for some reason, I blame treeshaking
   <div className="gap-2 flex flex-row">
      <Input label="Size" type='text' value={sizeLabel} onChange={e => setSize(e.target.value)} className="mr-2" disabled={!editing} />
      <Input label="Price" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} disabled={!editing} />
      <button className="bg-blue-300 p-3" type='button' onClick={() => setEditing(editing => !editing)}>{editing ? 'Done' : 'Edit'}</button>
    </div>
  )
}

export default function AddInventoryItemForm() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(20)
  const defaultEmptySize = {isEditing: true}
  const [sizes, setSizes] = useState<TSize[]>([defaultEmptySize])
  const [image, setImage] = useState('')
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload: InsertInventoryItem = {
      name,
      sizes,
      image,
    };
    // I have to 'use server' here I think? I hate this!
  }
  // @TODO: figure out a way to have an arbitrary number of sizes that the user can add
  // also don't use the index for the key in the .map()
  return(
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div>
        {sizes.map((size, idx) => (<SizeInput key={idx} setSizes={setSizes} {...size} />))}
        <button onClick={() => setSizes(sizes => [...sizes, {isEditing: true}])}>add size</button>
      </div>
      <button type='submit'>submit</button>
    </form>
  )
}