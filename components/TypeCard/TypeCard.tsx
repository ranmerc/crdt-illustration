import Image from "next/image";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Styles from "./TypeCard.module.css";

export default function TypeCard({
  name,
  description,
  src,
  href,
}: {
  name: string;
  description: string;
  src: string;
  href: string;
}) {
  return (
    <Link href={href} className={Styles.noLink}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="200" image={src} alt={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
