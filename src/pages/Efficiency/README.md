# Efficiency Component

Компонент для отображения двух полуокружностей, расположенных горизонтально плоскими сторонами друг к другу, образующих форму половины бублика с цветными секторами.

## Props

### `radius: number`

Радиус окружностей в пикселях.

### `sectors: Sector[]`

Массив секторов для отображения.

### Sector Interface

```typescript
interface Sector {
	id: number // Уникальный идентификатор сектора
	color: string // Цвет сектора (CSS цвет)
	startAngle: number // Начальный угол в радианах
	endAngle: number // Конечный угол в радианах
}
```

## Пример использования

```tsx
import Efficiency from './pages/Efficiency'

const sectors = [
	{ id: 1, color: '#FF6B6B', startAngle: 0, endAngle: Math.PI / 2 },
	{ id: 2, color: '#4ECDC4', startAngle: Math.PI / 2, endAngle: Math.PI },
	{ id: 3, color: '#45B7D1', startAngle: Math.PI, endAngle: (3 * Math.PI) / 2 },
	{
		id: 4,
		color: '#96CEB4',
		startAngle: (3 * Math.PI) / 2,
		endAngle: 2 * Math.PI
	}
]

;<Efficiency radius={200} sectors={sectors} />
```

## Углы

- `0` - правая точка
- `Math.PI / 2` - верхняя точка
- `Math.PI` - левая точка
- `3 * Math.PI / 2` - нижняя точка
- `2 * Math.PI` - снова правая точка

## Особенности

- Компонент автоматически центрируется на экране
- Полуокружности отображаются с толщиной обводки 20px
- Секторы автоматически определяют, к какой полуокружности они принадлежат
- Центральная линия разделяет верхнюю и нижнюю полуокружности

