import { OrderItem } from "./OrderItem";

export function App() {
  return (
    <main>
      <h2>Welcome to Deliveries-R-us</h2>

      <OrderItem sourceRest="Jiraffe" sourceAddress="No Street 1" clientName="Ploni almoni" clientAddress="Nowhere 5, NoPlace" status="awaiting pick up" updatedAt="19:00 07/05/25"/>

    </main>
  );
}
