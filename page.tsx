'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [items, setItems] = useState([{ nama: '', berat: '', satuan: 'gram', harga: '' }]);
  const [namaProduk, setNamaProduk] = useState('');
  const [tenagaKerja, setTenagaKerja] = useState('');
  const [pengiriman, setPengiriman] = useState('');
  const [beratKirim, setBeratKirim] = useState('');
  const [kemasan, setKemasan] = useState('100g');

  const jasaRetort = {
    '100g': { harga: 5100, max: 75 },
    '250g': { harga: 8000, max: 45 },
    '500g': { harga: 11500, max: 20 },
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { nama: '', berat: '', satuan: 'gram', harga: '' }]);
  };

  const hitung = () => {
    const totalBahan = items.reduce((sum, item) => sum + parseFloat(item.harga || 0), 0);
    const tenaga = parseFloat(tenagaKerja || 0);
    const kirim = parseFloat(pengiriman || 0);
    const jasa = jasaRetort[kemasan];
    const biayaRetort = jasa.harga * jasa.max;

    const biayaProduksi = totalBahan + tenaga + kirim;
    const total = biayaProduksi + biayaRetort;
    const hpp = total / jasa.max;
    const jual = hpp * 1.3;
    const brutoProfit = jual - hpp;
    const pajak = brutoProfit * 0.005;
    const netProfit = brutoProfit - pajak;

    return { totalBahan, tenaga, kirim, biayaProduksi, biayaRetort, total, hpp, jual, pcs: jasa.max, brutoProfit, pajak, netProfit };
  };

  const hasil = hitung();

  return (
    <div className="min-h-screen bg-blue-100 p-6 relative">
      <div className="absolute top-4 left-4">
        <Image src="/R2B2.png" alt="Logo" width={50} height={50} />
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-xl font-bold mb-4 text-center">Retort HPP Calculator</h1>

        <input placeholder="Nama Produk" className="border p-2 w-full mb-4" value={namaProduk} onChange={(e) => setNamaProduk(e.target.value)} />

        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-4 gap-2 mb-2">
            <input placeholder="Nama Bahan" className="border p-1" value={item.nama} onChange={(e) => handleItemChange(i, 'nama', e.target.value)} />
            <input placeholder="Berat" className="border p-1" value={item.berat} onChange={(e) => handleItemChange(i, 'berat', e.target.value)} />
            <input placeholder="Satuan" className="border p-1" value={item.satuan} onChange={(e) => handleItemChange(i, 'satuan', e.target.value)} />
            <input placeholder="Harga (Rp)" className="border p-1" value={item.harga} onChange={(e) => handleItemChange(i, 'harga', e.target.value)} />
          </div>
        ))}
        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={addItem}>+ Tambah Bahan</button>

        <div className="mt-4 space-y-2">
          <input placeholder="Biaya Tenaga Kerja (Rp)" className="border p-1 w-full" value={tenagaKerja} onChange={(e) => setTenagaKerja(e.target.value)} />
          <input placeholder="Biaya Pengiriman (Rp)" className="border p-1 w-full" value={pengiriman} onChange={(e) => setPengiriman(e.target.value)} />
          <input placeholder="Berat Kirim (kg)" className="border p-1 w-full" value={beratKirim} onChange={(e) => setBeratKirim(e.target.value)} />
          <select className="border p-1 w-full" value={kemasan} onChange={(e) => setKemasan(e.target.value)}>
            <option value="100g">Kemasan 100g</option>
            <option value="250g">Kemasan 250g</option>
            <option value="500g">Kemasan 500g</option>
          </select>
        </div>

        <div className="mt-6 border-t pt-4">
          <p>Total Biaya Bahan Baku: Rp {hasil.totalBahan.toLocaleString()}</p>
          <p>Biaya Tenaga Kerja: Rp {hasil.tenaga.toLocaleString()}</p>
          <p>Biaya Pengiriman: Rp {hasil.kirim.toLocaleString()}</p>
          <p><strong>Total Biaya Produksi (Termasuk Pengiriman): Rp {hasil.biayaProduksi.toLocaleString()}</strong></p>
          <p>Biaya Jasa Retort: Rp {hasil.biayaRetort.toLocaleString()}</p>
          <p><strong>Total Biaya Keseluruhan: Rp {hasil.total.toLocaleString()}</strong></p>
          <p>Jumlah Produk (pcs): {hasil.pcs}</p>
          <p>HPP per pcs: Rp {Math.round(hasil.hpp).toLocaleString()}</p>
          <p className="font-bold">Harga Jual per pcs (30% margin): Rp {Math.round(hasil.jual).toLocaleString()}</p>
          <p>Bruto Profit per pcs: Rp {Math.round(hasil.brutoProfit).toLocaleString()}</p>
          <p>Pajak UMKM (0.5%): Rp {Math.round(hasil.pajak).toLocaleString()}</p>
          <p className="font-bold">Net Profit per pcs: Rp {Math.round(hasil.netProfit).toLocaleString()}</p>
        </div>
      </div>

      <a href="https://wa.me/6282134320434" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg">
        Chat via WhatsApp
      </a>

      <footer className="text-center text-sm text-white mt-10">
        <p>Kontak: <a href="https://wa.me/6282134320434" target="_blank" rel="noopener noreferrer" className="underline">WhatsApp 0821-3432-0434</a></p>
        <p>&copy; 2025 PT Rumah Retort Bersama</p>
      </footer>
    </div>
  );
}
