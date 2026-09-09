import { Home, Paintbrush, Hammer } from "lucide-react";
const services = [
    {
        title: "New Construction",
        description: "End-to-end residential construction. We handle everything from site excavation and foundation laying to the final structural build, adhering to strict engineering standards.",
        icon: Home,
    },
    {
        title: "Renovation & Extension",
        description: "Transform existing properties with structural extensions, floor additions, or complete layout overhauls, seamlessly integrating new structures with the old.",
        icon: Hammer,
    },
    {
        title: "Interior Finishing",
        description: "High-quality finishing work including flooring, plastering, electrical, plumbing, and woodwork. Turning a concrete structure into a livable home.",
        icon: Paintbrush,
    },
];
export function Services() {
    return (
        <section className="py-24 bg-[var(--color-off-white)]">
            <div className="container mx-auto px-6">

                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-charcoal)]">
                        Our Services
                    </h2>
                    <p className="mt-4 text-lg text-[var(--color-steel)]">
                        Comprehensive construction services tailored to residential properties.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div key={index} className="bg-white p-8 border border-[var(--color-steel)]/10 hover:border-[var(--color-blueprint)]/30 transition-colors">
                                <div className="mb-6 p-4 bg-[var(--color-concrete)] inline-block">
                                    <Icon className="w-8 h-8 text-[var(--color-charcoal)]" />
                                </div>
                                <h3 className="text-xl font-bold text-[var(--color-charcoal)] mb-4">{service.title}</h3>
                                <p className="text-[var(--color-steel)] leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}