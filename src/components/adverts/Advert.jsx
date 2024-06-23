import clsx from "clsx";
import './Advert.css';

export default function Advert({ createdAt, name, sale, price, tags, photo }) {
	return (
	<div className="advert">
		<div className={clsx('floating', sale ? 'sale' : 'search')}>{sale ? 'Se vende' : 'Se busca'}</div>
		<div className="header">
			{
				photo ? (
					<div className="image" style={{ backgroundImage: `url(${photo})` }}></div>
				) : (
					<div className="image default">
						<span>Imagen por defecto</span>
					</div>
				)
			}
		</div>
		<div className="content">
			<div className="title">
				<h2>{name}</h2>
			</div>
			<div className="description">
				<div className="block">
					<span className="label">{sale ? 'Precio: ' : 'Dispuesto a pagar: '}</span>
					<span className="value">{price} euros</span>
				</div>
			</div>
		</div>
		<div className="footer">
			<div className="tags">
				{
					tags.length && tags.map(tag => (
						<span className="tag" key={tag}>{tag}</span>
					))
				}
			</div>
		</div>
	</div>
	);
}
