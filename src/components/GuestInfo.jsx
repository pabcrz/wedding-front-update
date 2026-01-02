export default function GuestInfo({
  guestChart,
  categoryFilter,
  onCategoryChange,
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <label htmlFor="categoryFilter" className="text-lg">
          Filtrar por:
        </label>
        <select
          id="categoryFilter"
          value={categoryFilter || ''}
          onChange={(e) => {
            const value = e.target.value
            onCategoryChange(value)
          }}
          className="border-2 rounded border-mainBG focus:outline-none p-1"
        >
          <option value="">Todos</option>
          <option value="Hombres" disabled={guestChart.man === 0}>
            Hombres {guestChart.man === 0 ? '(0)' : ''}
          </option>
          <option value="Mujeres" disabled={guestChart.woman === 0}>
            Mujeres {guestChart.woman === 0 ? '(0)' : ''}
          </option>
          <option value="Niños" disabled={guestChart.boys === 0}>
            Niños {guestChart.boys === 0 ? '(0)' : ''}
          </option>
          <option value="Niñas" disabled={guestChart.girls === 0}>
            Niñas {guestChart.girls === 0 ? '(0)' : ''}
          </option>
        </select>
      </div>

      {categoryFilter ? (
        // Si hay filtro de categoría, mostrar solo esa categoría
        (() => {
          const categoryMap = {
            Hombres: { label: 'Hombres', value: guestChart.man },
            Mujeres: { label: 'Mujeres', value: guestChart.woman },
            Niños: { label: 'Niños', value: guestChart.boys },
            Niñas: { label: 'Niñas', value: guestChart.girls },
          }
          const category = categoryMap[categoryFilter]
          return (
            <div className="flex gap-3">
              <p className="text-lg">
                {category.label}: <strong>{category.value}</strong>
              </p>
            </div>
          )
        })()
      ) : (
        // Si no hay filtro de categoría, mostrar todas
        <div className="flex gap-3">
          <p className="text-lg">
            Mujeres: <strong>{guestChart.woman}</strong>
          </p>
          <p className="text-lg">
            Hombres: <strong>{guestChart.man}</strong>
          </p>
          <p className="text-lg">
            Niñas: <strong>{guestChart.girls}</strong>
          </p>
          <p className="text-lg">
            Niños: <strong>{guestChart.boys}</strong>
          </p>
        </div>
      )}
    </div>
  )
}
