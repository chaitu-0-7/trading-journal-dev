import { auth } from "@/app/auth";
import { Trade } from "@/db/models";
import connectDB from "@/db/connect";
import EditClientComp from "./editClientComp";
import { ErrorPage } from "@/components/pages/errorPage";

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      // code to display page that you've redirected to wrong url
      return (
        <ErrorPage message={"You are logged out. Please login to continue"} />
      );
    }
    await connectDB();
    const tradeToEdit = await Trade.find({
      user: user?.id,
      _id: params.id,
    }).lean(true);
    if (tradeToEdit.length === 0) {
      // no trade such that page to redirect to home
      return (
        <ErrorPage message={"You are trying to edit a wrong trade. Please return to Home and try again"} />
      );
    }
    console.log(tradeToEdit)
    return (
      <div>
        <EditClientComp data={tradeToEdit[0]} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <ErrorPage message={"There was an error fetching the trade data."} />
    );
  }
}
