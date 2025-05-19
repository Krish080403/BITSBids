package com.bidding.model;

import java.time.LocalDateTime;

import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Document(collection="product")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Product {
    @Id
    private String id;
    @NotNull
	@Min(1)
    private Integer basePrice;
    @Min(1)
    @Max(650000)
    private Integer highestBid;
    @NotNull
	@Size(min=2, max=30)
    private String name;
    @NotNull
	@Size(min=2, max=300)
    private String description;
    private LocalDateTime postedDateTime;
    @NotNull
    private LocalDateTime bidStartDateTime;
    @NotNull
    private LocalDateTime bidEndDateTime;
    private String image;
    private String status;
    @NotNull
    private String ownerId;
}
