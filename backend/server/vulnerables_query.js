db.getCollection('sippe').aggregate([
    {
        $group: 
        {
            _id: "$CURP",
            cat: {$addToSet: "$CategoriadePago"}
        }
    },
    {
        $match: {cat:{$in: [/0633/,/0101/,/0201/,/2711/,/2725/,/2763/,/2781/,/689/,/687/,/681/,/629/,/281/,/181/,/221/,/121/]}}
    },
    {
        $lookup: {
            from: "usuarios",
            localField: "_id",
            foreignField: "usuario",
            as: "sifcUser"
        }
    },
    {
        $unwind: "$sifcUser"
    },
    {
        $lookup: {
            from: "registros",
            localField: "sifcUser._id",
            foreignField: "usuario",
            as: "registros"
        }
    },
    {
        $unwind: "$registros"
    },
    {
        $group: { _id: "$registros.oferta_formacion", registro: {$sum: 1} }
    },
    {
        $lookup: {
            from: "oferta_formacion",
            localField: "_id",
            foreignField: "_id",
            as: "oferta"
        }
    },
    {   $unwind: "$oferta"},
    {   $unwind: "$oferta.nombre_curso"},
    {
        $project: {
            _id: 1,
            nombre: "$oferta.nombre_curso",
            registro: 1
         }
    }
])