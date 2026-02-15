interface TourDescriptionProps {
  description: string;
}

export function TourDescription({ description }: TourDescriptionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">About This Tour</h2>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{description}</p>
      </div>
    </section>
  );
}
