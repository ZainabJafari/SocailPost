import express from 'express';
import cors from 'cors';
import multer from 'multer';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js'
import likesRoutes from './routes/likes.js'
import relationshipRoutes from './routes/relationshipt.js'
import cookieParser from 'cookie-parser';

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(200).json(file.filename);
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likesRoutes);
app.use('/api/relationships', relationshipRoutes);

app.listen(8000, () => {
    console.log('API working on port 8000');
});
